import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
    public readonly messages: unknown;
    
    constructor(response: unknown) {
        super(response as string | object, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}