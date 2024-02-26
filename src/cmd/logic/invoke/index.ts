import { Command } from "commander";

import { invokeLogic } from "./handler";

export const invoke = new Command("invoke");

invoke.description("Invoke a routine from a logic");

invoke.argument("<logicID>", "The logic ID to invoke");

invoke.action(invokeLogic);
