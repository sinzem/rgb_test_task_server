import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsUUID 
} from 'class-validator';

import { Client } from '../client.entity';


export class GetClientDto {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Client ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID() 
    readonly id: string;
} 

export class GetClientResponseDto {
    @ApiProperty({ type: Client})
    client: Client;
}