import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Client } from '../clients/client.entity';
import { DealStatus } from 'src/types/deals';


@Entity('deals')
export class Deal {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Unique deal identifier"}) 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({example: "Buying TV", description: "Deal name"})
    @Column({type: "varchar", nullable: false})
    title: string;

    @ApiProperty({example: "1234.56", description: "Deal amount"})
    @Column({type: 'decimal', precision: 12, scale: 2, nullable: false})
    amount: number;

    @ApiProperty({example: "IN_PROGRESS", description: "Deal status"})
    @Column({type: "enum", enum: DealStatus, default: DealStatus.NEW})
    status: DealStatus;

    @ApiProperty({example: "2025-11-12T13:14:49.250Z", description: "Create date"}) 
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: "2025-11-12T13:14:49.250Z", description: "Update date"}) 
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty({example: Client, description: "Client identifier"}) 
    @ManyToOne(() => Client, (client) => client.deals, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'clientId' })
    client: Client;
}