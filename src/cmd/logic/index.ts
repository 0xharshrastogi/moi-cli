import { Command } from "commander";

import { useCommonOptions } from "@/shared/options";

import { deploy } from "./deploy";
import { invoke } from "./invoke";

export const logic = new Command("logic");

useCommonOptions(logic);

logic.description("Manage your logic");
logic.summary("Manage your logic");

logic.addCommand(invoke);
logic.addCommand(deploy);
