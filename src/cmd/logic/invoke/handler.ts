import chalk from "chalk";
import type { Command } from "commander";
import inquirer from "inquirer";
import { getLogicDriver } from "js-moi-sdk";

import { createProvider, importWalletFromFile } from "@/lib/moi";
import type { ICommonOption } from "@/shared/options";
import { getEncryptedPassword, getRoutineInputPrompt } from "@/shared/prompts";
import { createSpinner } from "@/shared/spinner";

export const invokeLogic = async (logicID: string, _: ICommonOption, cmd: Command) => {
    const spinner = createSpinner();
    try {
        const { password } = await getEncryptedPassword();

        const globalOption = cmd.optsWithGlobals<ICommonOption>();
        const provider = createProvider(globalOption.network);
        const wallet = await importWalletFromFile(password);

        wallet.connect(provider);

        spinner.start("Fetching Logic");
        const logic = await getLogicDriver(logicID, wallet);
        spinner.succeed("Logic Fetched");

        const { method } = await inquirer.prompt([
            {
                type: "list",
                name: "method",
                message: "Select a method to invoke",
                choices: Object.keys(logic.routines),
            },
        ]);

        const routineArgs = logic.routines[method]!.accepts()!;
        const args = await getRoutineInputPrompt(logic.routines[method]!.accepts()!);
        const argsArray = routineArgs.map((arg) => args[arg.label]);

        spinner.start("Invoking Logic");
        const ix = await logic.routines[method]!(...argsArray);
        spinner.succeed("Logic Invoked");

        if (logic.routines[method]!.isMutable()) {
            console.log("Interaction Hash :: ", ix.hash);

            spinner.start("Waiting for interaction to complete");
            const result = await ix.result();
            spinner.succeed("Interaction Completed");

            console.log("Logic Returned ::", result);
            return;
        }

        console.log("Logic Returned :: ", ix);
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(error.message));
        }
    }
};
