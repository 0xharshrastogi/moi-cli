import { expect, test } from "vitest";

import { getPackageVersion } from "@/lib/utils";

test("getPackageVersion", async () => {
    const version = getPackageVersion();

    expect(version).to.be.a("string");
});
