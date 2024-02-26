import inquirer from "inquirer";

export const getDeployerPrompt = async (deployerCallsites: string[]) => {
    return await inquirer.prompt([
        {
            type: "list",
            name: "deployer",
            message: "Select the deployer callsite",
            choices: deployerCallsites,
        },
    ]);
};
