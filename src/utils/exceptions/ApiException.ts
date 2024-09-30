class ApiException extends Error {
    constructor(
        public readonly status: number,
        public readonly msg: string,
        public readonly errors: any = {},
    ) {
        super(msg);
        this.status = status;
        this.message = msg;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiException;
