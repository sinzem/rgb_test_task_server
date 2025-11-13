import { 
    ApiProperty, 
    ApiPropertyOptional
} from '@nestjs/swagger';
import { 
    IsInt, 
    Min 
} from 'class-validator';
import { Type } from 'class-transformer';

import { Client } from '../client.entity';

export class GetClientsDto {
    @ApiPropertyOptional({description: 'Page number (starting from 1)', example: 1})
    @Type(() => Number) 
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({description: 'Number of clients per page', example: 10})
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}

export class GetClientsResponseDto {
    @ApiProperty({ type: [Client] })
    clients: Client[];

    @ApiProperty({ example: 42 })
    total: number;
}