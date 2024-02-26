export class InvalidArgumentError extends Error {
    constructor(message: string, argName: string, allowedValues: unknown) {
        super(message);
        this.name = InvalidArgumentError.name;
        this.message = `${message}: Allowed values for ${argName}: ${allowedValues}`;
    }
}
