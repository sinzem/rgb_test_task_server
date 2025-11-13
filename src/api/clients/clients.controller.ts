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

import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { 
    CreateClientDto, 
    CreateClientResponseDto 
} from './dto/create-client.dto';
import { 
    GetClientsDto, 
    GetClientsResponseDto 
} from './dto/get-clients.dto';
import { 
    UpdateClientDto, 
    UpdateClientQueryDto, 
    UpdateClientResponseDto 
} from './dto/update-client.dto';
import { 
    GetClientDto, 
    GetClientResponseDto 
} from './dto/get-client.dto';
import { 
    DeleteClientDto, 
    DeleteClientResponseDto 
} from './dto/delete-client.dto';


@ApiTags("Clients")
@Controller('api/clients')
export class ClientsController {
    constructor(private clientsService: ClientsService) {}

    @ApiOperation({summary: "Creating client"})
    @ApiBody({ type: CreateClientDto })
    @ApiOkResponse({type: CreateClientResponseDto, description: 'Client has been successfully created'})
    @UsePipes(ValidationPipe)
    @Post() 
    createClient(@Body() dto: CreateClientDto) { 
        return this.clientsService.createClient(dto);
    }

    @ApiOperation({summary: "Get clients data"})
    @ApiOkResponse({type: GetClientsResponseDto, description: 'Sample of clients has been received'}) 
    @Get()
    getClients(@Query() query: GetClientsDto) {
        return this.clientsService.getClients(query);
    }

    @ApiOperation({summary: "Get client data and his/hers deals"})
    @ApiOkResponse({type: GetClientResponseDto, description: 'Client data has been received'}) 
    @Get("/:id")
    getClient(@Param() id: GetClientDto) {
        return this.clientsService.getClient(id);
    }

    @ApiOperation({summary: "Updating client data"})
    @ApiBody({ type: UpdateClientDto })
    @ApiOkResponse({type: UpdateClientResponseDto, description: 'Client has been successfully updated'})
    @UsePipes(ValidationPipe)
    @Patch("/:id") 
    updateClient(@Body() dto: UpdateClientDto, @Param() id: UpdateClientQueryDto) { 
        return this.clientsService.updateClient(dto, id);
    }

    @ApiOperation({summary: "Delete client data and his/hers deals"})
    @ApiOkResponse({type: DeleteClientResponseDto, description: 'Client data has been deleted'}) 
    @Delete("/:id")
    deleteClient(@Param() id: DeleteClientDto) {
        return this.clientsService.deleteClient(id);
    }
}
