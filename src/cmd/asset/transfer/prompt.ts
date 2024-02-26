import inquirer from "inquirer";
import type { TDU } from "js-moi-sdk";

type PromptParams = {
    assets: TDU[];
};

interface TransferPayload {
    asset: TDU;
    receiver: string;
    amount: number;
}

export const getTransferPayload = (params: PromptParams) => {
    return inquirer.prompt<TransferPayload>([
        {
            type: "list",
            name: "asset",
            message: "Select asset to transfer:",
            choices: params.assets.map((asset) => ({
                name: `${asset.asset_id} (Balance: ${asset.amount})`,
                value: asset,
            })),
        },
        {
            type: "input",
            name: "receiver",
            message: "Enter receiver address:",
        },
        {
            type: "number",
            name: "amount",
            message: "Amount:",
            validate: (value: number, answer) => {
                if (isNaN(value) || value < 0) {
                    return "Invalid amount";
                }

                if (answer && value > answer.asset.amount) {
                    return "Insufficient balance. Available balance: " + answer.asset.amount;
                }

                return true;
            },
        },
    ]);
};
