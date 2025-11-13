import { 
    BadRequestException, 
    ConflictException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { 
    UpdateClientDto, 
    UpdateClientQueryDto 
} from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { GetClientsDto } from './dto/get-clients.dto';
import { GetClientDto } from './dto/get-client.dto';
import { DeleteClientDto } from './dto/delete-client.dto';
import { Client } from './client.entity';


@Injectable()
export class ClientsService {

    constructor(
        @InjectRepository(Client) 
        private clientsRepository: Repository<Client>,
    ) {}

    async createClient(dto: CreateClientDto): Promise<{client: Client}> {
        const emailChecking = await this.clientsRepository.findBy({email: dto.email});
        if (emailChecking.length) throw new ConflictException({message: 'The email is already taken'});

        try {
            const client = this.clientsRepository.create({
                name: dto.name,
                email: dto.email,
                phone: dto.phone?.length ? dto.phone : null,
            })
            await this.clientsRepository.save(client);
            return {client};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error creating client account: ${e}`});
        }
    }

    async getClients({ page = 1, limit = 10 }: GetClientsDto): Promise<{clients: Client[], total: number}> {
        try {
            const [clients, total] = await this.clientsRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
            });
            
            return {clients, total};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error retrieving clients data: ${e}`});
        }
    }

    async getClient({id}: GetClientDto): Promise<{client: Client}> {
        try {
            const client = await this.clientsRepository.findOne({
                where: { id },
                relations: ['deals'],
            });

            if (!client) throw new NotFoundException('Client not found');

            return {client};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error retrieving clients data: ${e}`});
        }
    }

    async updateClient(dto: UpdateClientDto, {id}: UpdateClientQueryDto): Promise<{client: Client}> {
        if (Object.keys(dto).length === 0) throw new BadRequestException({message: `No data to change`}); 

        const client = await this.clientsRepository.findOneBy({id});

        if (!client) throw new BadRequestException({message: `There is no client with this ID`});

        try {
            const updatedClient = Object.assign(client, dto);
            await this.clientsRepository.save(updatedClient);
            return {client: updatedClient};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error updating client data: ${e}`});
        }
    }

    async deleteClient({id}: DeleteClientDto): Promise<{message: string}>  {
        try {
            const result = await this.clientsRepository.delete(id);

            if (result.affected === 0) throw new NotFoundException('Client not found');
            
            return {message: 'Client deleted successfully'};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error retrieving clients data: ${e}`});
        }
    }
}
