import { Type } from 'class-transformer';
import { 
    ApiProperty, 
    ApiPropertyOptional
} from '@nestjs/swagger';
import { 
    IsEnum, 
    IsInt, 
    IsOptional, 
    IsString, 
    IsUUID, 
    Min 
} from 'class-validator';

import { DealStatus } from 'src/types/deals';
import { Deal } from '../deal.entity';


export class GetDealsDto {
    @ApiPropertyOptional({description: 'Page number (starting from 1)', example: 1})
    @Type(() => Number) 
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({description: 'Number of deals per page', example: 10})
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({description: 'Search by status', example: "IN_PROGRESS"})
    @IsOptional()
    @IsEnum(DealStatus, { message: 'Status must be NEW, IN_PROGRESS, WON, LOST or absent altogether'})
    status?: DealStatus;

    @ApiPropertyOptional({description: 'Search by client ID', example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2"})
    @IsOptional()
    @IsString()
    @IsUUID()
    clientId?: string;
}

export class GetDealsResponseDto {
    @ApiProperty({type: [Deal]})
    clients: Deal[];

    @ApiProperty({example: 42})
    total: number;
}