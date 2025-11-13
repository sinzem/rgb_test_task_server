import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { 
    IsEnum, 
    IsNumber, 
    IsOptional, 
    IsString, 
    IsUUID, 
    Length, 
    Min 
} from "class-validator";

import { Deal } from "../deal.entity";
import { DealStatus } from "src/types/deals";


export class UpdateDealQueryDto {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Deal ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID() 
    readonly id: string;
} 

export class UpdateDealDto {
    @IsOptional()
    @ApiProperty({example: "Buying TV", description: "Deal name"})
    @IsString({message: "This should be a string"}) 
    @Length(1, 32, {message: "The name length must be from 1 to 32 characters"}) 
    readonly title?: string;

    @IsOptional()
    @ApiProperty({example: "1234.56", description: "Deal amount"}) 
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(0.01)
    readonly amount?: number;

    @IsOptional()
    @ApiProperty({example: "IN_PROGRESS", description: "Status must be NEW, IN_PROGRESS, WON, LOST or absent altogether"}) 
    @IsEnum(DealStatus, { message: 'Status must be NEW, IN_PROGRESS, WON, LOST or absent altogether'})
    readonly status?: DealStatus;
}

export class UpdateDealResponseDto {
    @ApiProperty({ type: Deal })
    client: Deal;
}