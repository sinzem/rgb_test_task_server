import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsUUID 
} from 'class-validator';

import { Deal } from '../deal.entity';


export class GetDealDto {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Deal ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID() 
    readonly id: string;
} 

export class GetDealResponseDto {
    @ApiProperty({ type: Deal})
    deal: Deal;
}