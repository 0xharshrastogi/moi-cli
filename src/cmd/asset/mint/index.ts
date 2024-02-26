import { Command } from "commander";

import { useCommonOptions } from "@/shared/options";

import { mintHandler } from "./handler";

export const mint = new Command("mint");

useCommonOptions(mint);

mint.description("Mint Assets");

mint.action(mintHandler);
