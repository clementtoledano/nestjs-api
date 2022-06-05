
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Entity('status')
export class StatusEntity {
    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    id: number;

    @Allow()
    @ApiProperty({ example: 'Active' })
    @Column()
    name: string;
}
