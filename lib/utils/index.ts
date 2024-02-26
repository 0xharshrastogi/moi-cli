export * from "./error";
export * from "./version";

export const isMnemonic = (mnemonic: string): boolean => mnemonic.trim().split(/\s+/g).length === 12;
