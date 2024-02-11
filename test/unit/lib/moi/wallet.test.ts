import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { expect, test } from "vitest";

import { isAccountSetup } from "@/lib/moi";

const filename = path.resolve(os.homedir(), ".moi", "cli-keystore.json");

test(isAccountSetup.name, async () => {
    const isFileExist = async () => {
        try {
            await fs.access(filename);
            return true;
        } catch (error) {
            return false;
        }
    };
    expect(await isAccountSetup()).toBe(await isFileExist());
});
