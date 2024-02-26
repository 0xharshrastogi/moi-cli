import inquirer, { type QuestionCollection } from "inquirer";
import type { LogicManifest } from "js-moi-sdk";

export const getEncryptedPassword = async () => {
    const questions: QuestionCollection = [
        {
            type: "password",
            name: "password",
            message: "Enter your encryption password",
        },
    ];

    return await inquirer.prompt<{ password: string }>(questions);
};

export const getRoutineInputPrompt = async (args: LogicManifest.TypeField[]): Promise<Record<string, unknown>> => {
    const questions = args.map((arg) => {
        return {
            type: arg.type,
            name: arg.label,
            message: `Enter the value for '${arg.label}' (${arg.type}):`,
        };
    });

    return await inquirer.prompt(questions);
};
