import chalk from "chalk";
import inquirer from "inquirer";
import type { InteractionObject } from "js-moi-sdk";
import { IxType } from "js-moi-sdk";

import { createProvider, importWalletFromFile } from "@/lib/moi";
import type { ICommonOption } from "@/shared/options";
import { getEncryptedPassword } from "@/shared/prompts";
import { createSpinner } from "@/shared/spinner";

import { getVoyageLink } from "../helper";

export const mintHandler = async (option: ICommonOption) => {
    const spinner = createSpinner();

    try {
        const { password } = await getEncryptedPassword();
        const wallet = await importWalletFromFile(password);
        const provider = createProvider(option.network);

        spinner.start("Loading Assets");
        const assets = await provider.getTDU(wallet.getAddress());
        spinner.succeed("Assets Loaded");

        const payload = await inquirer.prompt([
            {
                type: "list",
                name: "asset",
                message: "Select an asset to mint",
                choices: assets.map((asset) => ({ name: `${asset.asset_id} (Balance: ${asset.amount})`, value: asset })),
            },
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to mint",
                validate: (input) => {
                    if (isNaN(input)) {
                        return "Amount must be a number";
                    }
                    return true;
                },
            },
        ]);

        const ixObject: InteractionObject = {
            type: IxType.ASSET_MINT,
            fuel_price: 1,
            fuel_limit: 100,
            payload: {
                asset_id: payload.asset.asset_id,
                amount: payload.amount,
            },
        };

        wallet.connect(provider);

        spinner.start("Minting Asset");
        const ix = await wallet.sendInteraction(ixObject);

        spinner.clear();

        console.log("Interaction Hash ::", chalk.greenBright.bold(ix.hash));
        console.log("Interaction Page ::", chalk.blue.underline(getVoyageLink(ix.hash)));

        const { total_supply } = await ix.result();
        spinner.succeed(chalk.green.bold("Asset minted successfully"));
        spinner.stop();

        console.log("Total Supply :: ", chalk.greenBright.bold(total_supply));
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(error.message));
        }
    }
};
