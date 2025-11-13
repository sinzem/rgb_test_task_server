import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deal } from './deal.entity';
import { Client } from '../clients/client.entity';


@Module({
    controllers: [DealsController],
    providers: [DealsService],
    imports: [TypeOrmModule.forFeature([Deal, Client])],
    exports: []
})
export class DealsModule {}
