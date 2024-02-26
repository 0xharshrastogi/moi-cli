import { AbstractProvider } from "js-moi-sdk";
import { describe, expect, test } from "vitest";

import { createProvider, NetworkType } from "@/lib/moi";

describe("createProvider", () => {
    test("should create provider", () => {
        const provider = createProvider(NetworkType.Babylon);

        expect(provider).toBeInstanceOf(AbstractProvider);
    });

    test("should throw error if network type is not supported", () => {
        const network = "invalid" as NetworkType;

        expect(() => createProvider(network)).toThrowError(`Network ${network} not supported`);
    });
});
