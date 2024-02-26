import fs from "node:fs";

/**
 * Retrieves the version number from the package.json file.
 * @returns The version number as a string.
 */
export const getPackageVersion = (): string => {
    const data = fs.readFileSync("package.json", "utf8");
    const packageJson = JSON.parse(data);
    return packageJson.version;
};
