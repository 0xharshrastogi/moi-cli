import type { Command } from "commander";
import { CustomError, type LogicManifest } from "js-moi-sdk";

import { createProvider, importWalletFromFile } from "@/lib/moi";
import { MoiCliLogicFactory } from "@/lib/moi/logic";
import { isJsonExtension, loadJSONFile } from "@/lib/utils/file";
import type { ICommonOption } from "@/shared/options";
import { getEncryptedPassword, getRoutineInputPrompt } from "@/shared/prompts";
import { createSpinner } from "@/shared/spinner";

import { getDeployerPrompt } from "./prompts";

interface ICmdOption {
    file: string;
}

export const deployLogic = async (option: ICmdOption, cmd: Command) => {
    const spinner = createSpinner();
    try {
        if (!isJsonExtension(option.file)) {
            console.error(`Invalid file. File must have a manifest JSON.`);
            process.exit(1);
        }

        const manifest = await loadJSONFile(option.file);
        const globalOption = cmd.optsWithGlobals<ICommonOption>();
        const provider = createProvider(globalOption.network);
        const { password } = await getEncryptedPassword();
        const wallet = await importWalletFromFile(password);

        wallet.connect(provider);

        const factory = new MoiCliLogicFactory(manifest, wallet);
        const { deployer } = await getDeployerPrompt(Array.from(factory.getDeployerCallsites().keys()));
        const callsite = factory.getRoutineElement(deployer);

        if (!callsite || typeof callsite.data !== "object" || !("accepts" in callsite.data)) {
            console.error(`Invalid deployer callsite: ${deployer}`);
            process.exit(1);
        }

        const routineArgs = (callsite.data as LogicManifest.Method).accepts!;
        const params = await getRoutineInputPrompt(routineArgs);
        const args = routineArgs.map((arg) => params[arg.label]);
        const ix = await factory.deploy(deployer, ...args, {
            fuelLimit: 4000,
            fuelPrice: 1,
        });

        console.log("Interaction Hash :: ", ix.hash);
        spinner.start("Waiting for interaction to complete");

        const result = await ix.result();

        spinner.succeed("Interaction Completed");
        console.log("Logic ID ::", result.logic_id);
    } catch (error) {
        if (error instanceof CustomError) {
            spinner.fail(error.message);
            process.exit(1);
        }

        if (error instanceof SyntaxError) {
            spinner.fail(`Invalid JSON file: ${option.file}`);
            process.exit(1);
        }

        if (error instanceof Error) {
            if ("code" in error && error.code === "ENOENT") {
                spinner.fail(`File not found: ${option.file}`);
                process.exit(1);
            }
        }

        spinner.fail(error instanceof Error ? error.message : "An error occurred");
        process.exit(1);
    }
};
