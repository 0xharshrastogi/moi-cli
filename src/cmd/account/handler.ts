import chalk from "chalk";
import { generateMnemonic, Wallet } from "js-moi-sdk";

import { exportWalletToFile, importWalletFromFile, isAccountSetup } from "@/lib/moi";
import { getEncryptedPassword } from "@/shared/prompts";

import { getPromptAnswer } from "./prompts";

export const setup = async () => {
    const params = await getPromptAnswer();

    const mnemonic = params.method === "create" ? generateMnemonic() : params.mnemonic;

    const wallet = await Wallet.fromMnemonic(mnemonic, params.path);
    await exportWalletToFile(wallet, params.password);
};

export const info = async () => {
    try {
        if (!(await isAccountSetup())) {
            console.log("Account is not setup. Please run `moi account setup` to setup your account.");
            return;
        }

        const { password } = await getEncryptedPassword();

        const wallet = await importWalletFromFile(password);

        console.log(`${chalk.blue("Address")}: ${wallet.getAddress()}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            process.exit(1);
        }

        console.error("An error occurred", error);
    }
};
