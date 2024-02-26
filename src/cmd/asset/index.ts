import { Command } from "commander";

import { isAccountSetup } from "@/lib/moi";
import { useCommonOptions } from "@/shared/options";

import { create } from "./create";
import { mint } from "./mint";
import { transfer } from "./transfer";

export const asset = new Command("asset");

useCommonOptions(asset);

asset.hook("preSubcommand", async () => {
    if (!(await isAccountSetup())) {
        console.log("Account is not setup. Please run `moi account setup` to setup your account.");
        process.exit(1);
    }
});

asset.description("Manage your assets");

asset.addCommand(create);
asset.addCommand(transfer);
asset.addCommand(mint);
