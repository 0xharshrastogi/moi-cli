import type { Question } from "inquirer";

/**
 * Get the primitive type of a given type from the logic manifest
 * @param type
 * @returns
 */
export const getPrimitiveType = (type: string): Question["type"] => {
    switch (type) {
        case "i64":
        case "i256":
        case "u64":
        case "u256":
            return "number";
        case "string":
        case "address":
            return "input";
        case "bool":
            return "confirm";
        default:
            throw new Error(`Complex types are not supported yet: ${type}. Please use Voyage to invoke this method.`);
    }
};
