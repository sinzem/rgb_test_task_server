import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { 
    IsNumber, 
    IsString, 
    IsUUID, 
    Length, 
    Min 
} from "class-validator";

import { Deal } from "../deal.entity";


export class CreateDealDto {
    @ApiProperty({example: "Buying TV", description: "Deal name"})
    @IsString({message: "This should be a string"}) 
    @Length(1, 32, {message: "The name length must be from 1 to 32 characters"}) 
    readonly title: string;

    @ApiProperty({example: "1234.56", description: "Deal amount"}) 
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(0.01)
    readonly amount: number;

    @ApiProperty({example: "91c1adc6-2b17-4bdb-9835-515bd1fb5fb8", description: "Client ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID()
    readonly clientId: string;
}

export class CreateDealResponseDto {
    @ApiProperty({ type: Deal })
    deal: Deal;
}
