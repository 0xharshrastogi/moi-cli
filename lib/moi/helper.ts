import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";

export const DIRECTORY_NAME = ".moi";

export const MOI_DIRECTORY = path.resolve(os.homedir(), DIRECTORY_NAME);

export const isMoiDirectoryExists = (): boolean => {
    return fsSync.existsSync(MOI_DIRECTORY);
};

export const createMoiDirectory = (): void => {
    if (!isMoiDirectoryExists()) {
        fsSync.mkdirSync(MOI_DIRECTORY);
    }
};
