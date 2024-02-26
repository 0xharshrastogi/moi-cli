import { LogicFactory } from "js-moi-sdk";

export class MoiCliLogicFactory extends LogicFactory {
    getDeployerCallsites() {
        return Array.from(this.getCallsites()).reduce((acc, [key, value]) => {
            if (value.kind === "deployer") {
                acc.set(key, value);
            }
            return acc;
        }, new Map());
    }
}
