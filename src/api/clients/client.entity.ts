import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany 
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Deal } from '../deals/deal.entity';

@Entity('clients')
export class Client {
    @ApiProperty({example: "9a7fcdea-03f9-41f9-82eb-4fc367368ca2", description: "Unique client identifier"}) 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({example: "Donald", description: "Client name"})
    @Column({type: "varchar", nullable: false})
    name: string;

    @ApiProperty({example: "name@gmail.com", description: "Email"}) 
    @Column({type: "varchar", nullable: false, unique: true})
    email: string;

    @ApiProperty({example: "+380990000000 || null", description: "Phone number (optional)"}) 
    @Column({type: "varchar", nullable: true})
    phone?: string | null;

    @ApiProperty({example: "2025-11-12T13:14:49.250Z", description: "Create date"}) 
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: "2025-11-12T13:14:49.250Z", description: "Update date"}) 
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty({example: Deal, description: "Array with the client's deal IDs"}) 
    @OneToMany(() => Deal, (deal) => deal.client, {cascade: true})
    deals: Deal[];
}
