import { ApiProperty } from '@nestjs/swagger';
import { 
    IsString, 
    IsUUID 
} from 'class-validator';

export class DeleteDealDto {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Deal ID"}) 
    @IsString({message: "This should be a string"}) 
    @IsUUID() 
    readonly id: string;
} 

export class DeleteDealResponseDto {
    @ApiProperty({ type: String, example: "Deal deleted successfully"})
    message: string;
}