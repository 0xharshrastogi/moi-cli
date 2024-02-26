import { Command } from "commander";

import { useCommonOptions } from "@/shared/options";

import { transfer as transferAction } from "./handler";

export const transfer = new Command("transfer");

useCommonOptions(transfer);

transfer.description("Transfer an asset to another account.");

transfer.action(transferAction);
