import fs from "node:fs/promises";

/**
 * Check if the file path has a JSON extension
 *
 * @param filePath The file path to check
 * @returns True if the file path has a JSON extension, false otherwise
 */
export const isJsonExtension = (filePath: string) => filePath.endsWith(".json");

export const loadJSONFile = async (filePath: string) => {
    console.log("Loading JSON file", filePath);
    const blob = await fs.readFile(filePath, "utf-8");

    return JSON.parse(blob);
};

export const isFileExist = async (filePath: string) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
};
