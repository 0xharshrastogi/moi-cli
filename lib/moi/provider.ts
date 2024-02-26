import type { BaseProvider } from "js-moi-sdk";
import { JsonRpcProvider, VoyageProvider } from "js-moi-sdk";

import { NetworkType } from "./enums";

const host: Record<NetworkType, () => BaseProvider> = {
    [NetworkType.Local]: () => new JsonRpcProvider("http://localhost:1600"),
    [NetworkType.Babylon]: () => new VoyageProvider("babylon"),
};

export const createProvider = (network: NetworkType): BaseProvider => {
    if (!host[network]) {
        throw new Error(`Network ${network} not supported`);
    }

    return host[network]();
};
