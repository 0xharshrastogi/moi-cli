import { Command, Option } from "commander";

import { deployLogic } from "./handler";

export const deploy = new Command("deploy");

deploy.description("Deploy a logic");
deploy.addOption(new Option("-f, --file <file>", "The manifest file to deploy").makeOptionMandatory());

deploy.action(deployLogic);
