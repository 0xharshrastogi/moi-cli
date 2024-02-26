import type { Command } from "commander";
import { Option } from "commander";

import { NetworkType } from "@/lib/moi";

export interface ICommonOption {
    network: NetworkType;
}

const network = new Option("-n, --network <network>", "Set the network to use").default(NetworkType.Babylon);

export const useCommonOptions = (command: Command) => {
    command.addOption(network);
};
