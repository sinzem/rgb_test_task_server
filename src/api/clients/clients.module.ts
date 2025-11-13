import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';


@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client])],
  exports: []
})
export class ClientsModule {}
