import { JsonRpcProvider } from "js-moi-sdk";

import { NetworkType } from "./enums";

const host: Record<NetworkType, string> = {
    [NetworkType.Local]: "http://localhost:1600",
    [NetworkType.Babylon]: "https://voyage-rpc.moi.technology/babylon/",
};

export const createProvider = (network: NetworkType): JsonRpcProvider => {
    return new JsonRpcProvider(host[network]);
};
