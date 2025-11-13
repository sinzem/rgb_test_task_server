import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { 
    IsEmail, 
    IsOptional, 
    IsString, 
    Length 
} from "class-validator";

import { Client } from "../client.entity";


export class CreateClientDto {
    @ApiProperty({example: "Donald", description: "Client name"}) 
    @IsString({message: "This should be a string"}) 
    @Length(2, 20, {message: "The name length must be from 2 to 20 characters"}) 
    readonly name: string;

    @ApiProperty({example: "example@gmail.com", description: "Email address"}) 
    @IsString({message: "This should be a string"}) 
    @IsEmail({}, {message: "Incorrect email address"}) 
    readonly email: string;

    @ApiProperty({example: "+380990000000 || null", description: "Phone number (optional)"}) 
    @IsOptional()
    @IsString({message: "This should be a string"}) 
    @Length(13, 13, {message: 'The phone number must consist of the “+” sign and twelve digits or be empty'}) 
    @Transform(({ value }) => (value === null ? undefined : value))
    readonly phone?: string | null;
}

export class CreateClientResponseDto {
    @ApiProperty({ type: Client })
    client: Client;
}