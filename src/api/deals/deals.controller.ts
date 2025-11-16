import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { 
    ApiBody, 
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';

import { DealsService } from './deals.service';
import { 
    CreateDealDto, 
    CreateDealResponseDto 
} from './dto/create-deal.dto';
import { 
    GetDealsDto, 
    GetDealsResponseDto 
} from './dto/get-deals.dto';
import { 
    UpdateDealDto, 
    UpdateDealQueryDto, 
    UpdateDealResponseDto 
} from './dto/update-deal.dto';
import { 
    DeleteDealDto, 
    DeleteDealResponseDto 
} from './dto/delete-deal.dto';
import { GetDealDto, GetDealResponseDto } from './dto/get-deal.dto';


@ApiTags("Deals")
@Controller('api/deals')
export class DealsController {
    constructor(private dealsService: DealsService) {}

    @ApiOperation({summary: "Creating deal"})
    @ApiBody({ type: CreateDealDto })
    @ApiOkResponse({type: CreateDealResponseDto, description: 'Deal has been successfully created'})
    @UsePipes(ValidationPipe)
    @Post() 
    createDeal(@Body() dto: CreateDealDto) { 
        return this.dealsService.createDeal(dto);
    }

    @ApiOperation({summary: "Get deals data"})
    @ApiOkResponse({type: GetDealsResponseDto, description: 'Sample of deals has been received'}) 
    @Get()
    getDeals(@Query() query: GetDealsDto) {
        return this.dealsService.getDeals(query);
    }

    @ApiOperation({summary: "Get deal data and its owner"})
    @ApiOkResponse({type: GetDealResponseDto, description: 'Deal data has been received'}) 
    @Get("/:id")
    getClient(@Param() id: GetDealDto) {
        return this.dealsService.getDeal(id);
    }

    @ApiOperation({summary: "Updating deal data"})
    @ApiBody({ type: UpdateDealDto })
    @ApiOkResponse({type: UpdateDealResponseDto, description: 'Deal has been successfully updated'})
    @UsePipes(ValidationPipe)
    @Patch("/:id") 
    updateDeal(@Body() dto: UpdateDealDto, @Param() id: UpdateDealQueryDto) { 
        return this.dealsService.updateDeal(dto, id);
    }

    @ApiOperation({summary: "Delete deal"})
    @ApiOkResponse({type: DeleteDealResponseDto, description: 'Deal data has been deleted'}) 
    @Delete("/:id")
    deleteDeal(@Param() id: DeleteDealDto) {
        return this.dealsService.deleteDeal(id);
    }
}
