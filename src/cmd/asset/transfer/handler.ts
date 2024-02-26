import chalk from "chalk";
import type { InteractionObject } from "js-moi-sdk";
import { IxType } from "js-moi-sdk";

import { createProvider, importWalletFromFile } from "@/lib/moi";
import type { ICommonOption } from "@/shared/options";
import { getEncryptedPassword } from "@/shared/prompts";
import { createSpinner } from "@/shared/spinner";

import { getVoyageLink } from "../helper";
import { getTransferPayload } from "./prompt";

export const transfer = async (option: ICommonOption) => {
    const spinner = createSpinner();
    try {
        const { password } = await getEncryptedPassword();

        const wallet = await importWalletFromFile(password);
        const provider = createProvider(option.network);

        spinner.start("Loading Assets");
        const assets = await provider.getTDU(wallet.getAddress());
        spinner.succeed(`Loaded ${assets.length} assets`);

        if (assets.length === 0) {
            spinner.fail("No assets found");
            return;
        }

        const payload = await getTransferPayload({ assets });

        const ixObject: InteractionObject = {
            type: IxType.VALUE_TRANSFER,
            fuel_price: 1,
            fuel_limit: 100,
            sender: wallet.getAddress(),
            receiver: payload.receiver,
            transfer_values: new Map([[payload.asset.asset_id, payload.amount]]),
        };

        spinner.start("Transferring asset");
        wallet.connect(provider);
        const ix = await wallet.sendInteraction(ixObject);

        spinner.clear();

        console.log("Interaction Hash :: ", chalk.greenBright.bold(ix.hash));
        console.log("Interaction Page :: ", chalk.blue.underline(getVoyageLink(ix.hash)));

        await ix.result();
        spinner.succeed(chalk.green.bold("Asset transferred successfully"));
        spinner.stop();
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(error?.message ?? "Something went wrong. Please try again."));
        }
    }
};
