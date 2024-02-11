import { Command } from "commander";

import { info, setup } from "./handler";

export const account = new Command("account");

account.description("Manage account");

account.command("setup").action(setup);
account.command("info").action(info);
