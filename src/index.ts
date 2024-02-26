#!/usr/bin/env node

import { program } from "commander";

import { getPackageVersion } from "@/lib/utils";

import { account, asset, logic } from "./cmd";

program
    .name("moi")
    .description("A simple CLI tool to interact with MOI protocol.")
    .version(getPackageVersion(), "-v, --version", "Output the current version.");

// Commands
program.addCommand(account);
program.addCommand(asset);
program.addCommand(logic);

program.parse(process.argv);
