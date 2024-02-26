import chalk from "chalk";
import type { InteractionObject } from "js-moi-sdk";
import { IxType } from "js-moi-sdk";

import { createProvider, importWalletFromFile } from "@/lib/moi";
import type { ICommonOption } from "@/shared/options";
import { getEncryptedPassword } from "@/shared/prompts";
import { createSpinner } from "@/shared/spinner";

import { getVoyageLink } from "../helper";
import { getAssetCreateParams } from "./prompt";

export const createAsset = async (option: ICommonOption) => {
    const spinner = createSpinner();

    try {
        const payload = await getAssetCreateParams();

        const ixObject: InteractionObject = {
            type: IxType.ASSET_CREATE,
            fuel_price: 1,
            fuel_limit: 100,
            payload: {
                symbol: payload.symbol,
                supply: payload.supply,
                standard: payload.standard,
            },
        };

        const { password } = await getEncryptedPassword();

        const wallet = await importWalletFromFile(password);
        wallet.connect(createProvider(option.network));

        spinner.start("Sending transaction");
        const ix = await wallet.sendInteraction(ixObject);

        spinner.clear();

        console.log("Interaction Hash :: ", chalk.greenBright.bold(ix.hash));
        console.log("Interaction Page :: ", chalk.blue.underline(getVoyageLink(ix.hash)));

        spinner.start("Waiting for transaction to be confirmed");
        const result = await ix.result();
        spinner.succeed(`Asset ID :: ${chalk.green(result.asset_id)}`);
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red("\nError :: ", error.message || "Something went wrong. Please try again."));
        }
    }
};
