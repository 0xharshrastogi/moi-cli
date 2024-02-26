import { Command } from "commander";

import { useCommonOptions } from "@/shared/options";

import { createAsset } from "./handler";

export const create = new Command("create");

useCommonOptions(create);

create.description("Create an asset");

create.action(createAsset);
