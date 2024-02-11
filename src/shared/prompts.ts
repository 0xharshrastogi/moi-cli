import inquirer, { type QuestionCollection } from "inquirer";

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
