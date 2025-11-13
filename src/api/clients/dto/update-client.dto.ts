import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { 
    IsEmail, 
    IsOptional, 
    IsString, 
    IsUUID, 
    Length 
} from "class-validator";

import { Client } from "../client.entity";

export class UpdateClientQueryDto {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Client ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID() 
    readonly id: string;
} 

export class UpdateClientDto {
    @IsOptional()
    @ApiProperty({example: "Donald || null", description: "Client name (optional)"}) 
    @IsString({message: "This should be a string"}) 
    @Length(2, 20, {message: "The name length must be from 2 to 20 characters"}) 
    @Transform(({ value }) => (value === null ? undefined : value))
    readonly name?: string | null;

    @IsOptional()
    @ApiProperty({example: "example@gmail.com || null", description: "Email address (optional)"})
    @IsString({message: "This should be a string"}) 
    @IsEmail({}, {message: "Incorrect email address"}) 
    @Transform(({ value }) => (value === null ? undefined : value))
    readonly email?: string | null;

    @IsOptional()
    @ApiProperty({example: "+380990000000 || null", description: "Phone number (optional)"}) 
    @IsString({message: "This should be a string"}) 
    @Length(13, 13, {message: 'The phone number must consist of the “+” sign and twelve digits or be empty'}) 
    @Transform(({ value }) => (value === null ? undefined : value))
    readonly phone?: string | null;
}

export class UpdateClientResponseDto {
    @ApiProperty({ type: Client })
    client: Client;
}