import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Wallet } from "js-moi-sdk";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { exportWalletToFile, importWalletFromFile, isAccountSetup } from "@/lib/moi";
import { isFileExist } from "@/lib/utils/file";

describe("lib/moi/wallet.ts", () => {
    let filePath: string;
    let address: string;

    beforeEach(async () => {
        const filename = "cli-keystore-" + Date.now() + ".json";

        const wallet = new Wallet();
        await wallet.createRandom();

        filePath = path.resolve(os.tmpdir(), filename);
        await exportWalletToFile(wallet, "password", { filePath });

        address = wallet.getAddress();
    });

    test("isAccountSetup", async () => {
        const [expected, actual] = await Promise.all([isFileExist(filePath), isAccountSetup()]);

        expect(actual).toBe(expected);
    });

    test("exportWalletToFile", async () => {
        expect(await isFileExist(filePath)).toBeTruthy();
    });

    test("importWalletFromFile", async () => {
        const wallet = await importWalletFromFile("password", { filePath });
        expect(wallet.getAddress()).toBe(address);
    });

    afterEach(async () => {
        await fs.rm(filePath, { force: true });
    });
});
