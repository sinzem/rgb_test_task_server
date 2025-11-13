import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { 
    ConfigModule, 
    ConfigService 
} from '@nestjs/config';

import { DealsModule } from './api/deals/deals.module';
import { Deal } from './api/deals/deal.entity';
import { Client } from './api/clients/client.entity';
import { ClientsModule } from './api/clients/clients.module';

@Module({
    imports: [ 
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], 
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: "postgres",
                    host: config.get<string>('DB_HOST', 'localhost'),
                    port: Number(config.get<string>('DB_PORT', '5432')),
                    username: config.get<string>('DB_USERNAME', 'postgres'),
                    password: config.get<string>('DB_PASSWORD'),
                    database: config.get<string>('DB_NAME'),
                    synchronize: config.get<string>('DB_SYNCHRONIZE') === "true",
                    // autoLoadEntities: config.get<string>('DB_AUTOLOADENTITIES') === "true",
                    entities: [Client, Deal],
                }
            },
        }),
        ClientsModule, 
        DealsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
