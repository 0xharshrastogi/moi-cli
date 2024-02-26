import fs from "fs";
import { describe, expect, test } from "vitest";

import { isMoiDirectoryExists, MOI_DIRECTORY } from "@/lib/moi";

describe("lib/moi/helper.ts", () => {
    test("isMoiDirectoryExists", () => {
        const exist = isMoiDirectoryExists();

        expect(exist).toBe(fs.existsSync(MOI_DIRECTORY));
    });

    test("createMoiDirectory", () => {
        const exist = isMoiDirectoryExists();

        expect(exist).toBe(fs.existsSync(MOI_DIRECTORY));
    });
});
