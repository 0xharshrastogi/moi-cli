import fs from "node:fs/promises";
import path from "node:path";

import { Wallet } from "js-moi-sdk";

import { isFileExist } from "../utils/file";
import { createMoiDirectory, isMoiDirectoryExists, MOI_DIRECTORY } from "./helper";

const KEYSTORE = "cli-keystore.json";

const getFilePath = () => {
    return path.resolve(MOI_DIRECTORY, KEYSTORE);
};

export const exportWalletToFile = async (wallet: Wallet, key: string, options?: { filePath?: string }) => {
    if (!isMoiDirectoryExists()) {
        createMoiDirectory();
    }

    const keystore = wallet.generateKeystore(key);
    const blob = JSON.stringify(keystore);
    const filePath = options?.filePath ?? getFilePath();
    await fs.writeFile(filePath, blob);

    console.log(`Wallet exported to ${filePath}`);
};

export const importWalletFromFile = async (key: string, options?: { filePath: string }): Promise<Wallet> => {
    if (!isAccountSetup()) {
        throw new Error("Account is not setup");
    }

    const filePath = options?.filePath ?? getFilePath();
    const blob = await fs.readFile(filePath, "utf-8");
    const wallet = new Wallet();

    wallet.fromKeystore(blob, key);
    return wallet;
};
export const isAccountSetup = async () => {
    const filePath = getFilePath();
    return await isFileExist(filePath);
};
