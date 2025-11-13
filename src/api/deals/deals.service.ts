import { 
    BadRequestException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Deal } from './deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { Client } from '../clients/client.entity';
import { GetDealsDto } from './dto/get-deals.dto';
import { DeleteDealDto } from './dto/delete-deal.dto';
import { 
    UpdateDealDto, 
    UpdateDealQueryDto 
} from './dto/update-deal.dto';


@Injectable()
export class DealsService {
    constructor(
        @InjectRepository(Deal) 
        private dealsRepository: Repository<Deal>,
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>,
    ) {}

    async createDeal(dto: CreateDealDto): Promise<{deal: Deal}> {
        const client = await this.clientsRepository.findOneBy({id: dto.clientId});    
        if (!client) throw new NotFoundException('Client not found');

        try {
            const deal = this.dealsRepository.create({
                title: dto.title,
                amount: 111.11,
                client
            })
            await this.dealsRepository.save(deal);
            
            return {deal};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error creating new deal: ${e}`});
        }
    }

    async getDeals({page = 1, limit = 10, status = undefined, clientId = undefined}: GetDealsDto): Promise<{deals: Deal[], total: number}> {
        const where: any = {};

        if (clientId) where.client = {id: clientId};;
        if (status) where.status = status;

        const [deals, total] = await this.dealsRepository.findAndCount({
            where,
            take: limit,
            skip: (page - 1) * limit
        });

        return {deals, total};
    }

    async updateDeal(dto: UpdateDealDto, {id}: UpdateDealQueryDto): Promise<{deal: Deal}> {
        if (Object.keys(dto).length === 0) throw new BadRequestException({message: `No data to change`}); 

        const deal = await this.dealsRepository.findOneBy({id});
        if (!deal) throw new BadRequestException({message: `There is no deal with this ID`});

        try {
            const updatedDeal = Object.assign(deal, dto);
            await this.dealsRepository.save(updatedDeal);
            return {deal: updatedDeal};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error updating deal data: ${e}`});
        }
    } 
   
    async deleteDeal({id}: DeleteDealDto): Promise<{message: string}>  {
        try {
            const result = await this.dealsRepository.delete(id);

            if (result.affected === 0) throw new NotFoundException('Deal not found');
            
            return {message: 'Deal deleted successfully'};
        } catch (e) {
            throw new InternalServerErrorException({message: `Error retrieving deal data: ${e}`});
        }
    }
}
