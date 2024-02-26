import inquirer, { type QuestionCollection } from "inquirer";

import { DeviationPath } from "@/lib/moi";
import { isMnemonic } from "@/lib/utils";

interface PromptAnswerCommon {
    path: DeviationPath;
}

interface PromptAnswerCreate extends PromptAnswerCommon {
    method: "create";
    password: string;
    confirmPassword: string;
}

interface PromptAnswerExisting extends PromptAnswerCommon {
    method: "existing";
    mnemonic: string;
    password: string;
}

type PromptAnswer = PromptAnswerCreate | PromptAnswerExisting;

export const getPromptAnswer = async () => {
    const questions: QuestionCollection = [
        {
            type: "list",
            message: "Do you want to create a new account or use an existing one?",
            name: "method",
            choices: ["create", "existing"],
        },
        {
            when: (answers: PromptAnswer) => answers.method === "existing",
            input: "password",
            name: "mnemonic",
            message: "Enter your mnemonic phrase",
            validate: (value: string) => {
                if (!isMnemonic(value)) {
                    return "Invalid mnemonic phrase";
                }
                return true;
            },
        },
        {
            type: "input",
            name: "path",
            message: "Enter the deviation path (optional)",
            default: DeviationPath.Babylon,
        },
        {
            type: "password",
            name: "password",
            message: "Enter a encryption password",
        },
        {
            type: "password",
            name: "confirmPassword",
            message: "Confirm the encryption password",
            validate: (value: string, answers: PromptAnswer) => {
                if (value !== answers.password) {
                    return "The passwords do not match";
                }
                return true;
            },
        },
    ];

    return await inquirer.prompt<PromptAnswer>(questions);
};
