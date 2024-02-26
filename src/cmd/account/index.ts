import { Command } from "commander";

import { useCommonOptions } from "@/shared/options";

import { info, setup } from "./handler";

export const account = new Command("account");

useCommonOptions(account);

account.description("Manage account");

account.command("setup").action(setup);
account.command("info").action(info);
