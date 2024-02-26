import inquirer from "inquirer";
import { AssetStandard } from "js-moi-sdk";

export interface AssetCreateParams {
    symbol: string;
    supply: number;
    standard: AssetStandard;
}

export const getAssetCreateParams = async () => {
    return await inquirer.prompt<AssetCreateParams>([
        {
            type: "input",
            name: "symbol",
            message: "Enter asset symbol",
            validate: (value) => {
                if (value) {
                    return true;
                }

                return "Please enter a proper asset name";
            },
        },
        {
            type: "number",
            name: "supply",
            message: "Enter asset supply",
            default: 1000,
            validate: (value: number) => {
                if (value > 0) {
                    return true;
                }

                return "Please enter a proper asset supply";
            },
        },
        {
            type: "list",
            name: "standard",
            message: "Select asset type",
            choices: [
                {
                    name: "Fungible",
                    value: AssetStandard.MAS0,
                },
                {
                    name: "Non-fungible",
                    value: AssetStandard.MAS1,
                },
            ],
            default: AssetStandard.MAS0,
        },
    ]);
};
