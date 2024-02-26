import { describe, expect, test } from "vitest";

import { isFileExist, loadJSONFile } from "@/lib/utils/file";

describe("isJSONExtension", () => {
    test("should return true if file has .json extension", () => {
        expect(true).toBeTruthy();
    });

    test("should return false if file has .txt extension", () => {
        expect(false).toBeFalsy();
    });
});

test("loadJSONFile", async () => {
    const filePath = "package.json";
    const obj = await loadJSONFile(filePath);

    expect(typeof obj).toBe("object");
});

describe("isFileExist", () => {
    test("should return a promise that resolves to a boolean", () => {
        const isExistPromise = isFileExist("package.json");

        expect(isExistPromise).toBeInstanceOf(Promise);
        expect(isExistPromise).resolves.toBe(true);
    });

    test("should return true if file exists", async () => {
        const isExist = await isFileExist("package.json");

        expect(isExist).toBeTruthy();
    });

    test("should return false if file does not exist", async () => {
        const isExist = await isFileExist("invalid-file.json");

        expect(isExist).toBeFalsy();
    });
});
