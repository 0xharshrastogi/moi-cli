#!/usr/bin/env node

import { program } from "commander";

import { getPackageVersion } from "@/lib/utils";

import { account } from "./cmd";

program
    .name("moi")
    .description("A simple CLI tool to interact with MOI protocol.")
    .version(getPackageVersion(), "-v, --version", "Output the current version.");

// Commands
program.option("-n, --network <network>", "Set the network to use", "mainnet");

program.opts();
program.addCommand(account);

program.parse(process.argv);
