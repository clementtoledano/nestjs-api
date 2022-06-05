import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Entity('role')
export class RoleEntity {
    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    id: number;

    @Allow()
    @ApiProperty({ example: 'Admin' })
    @Column()
    name: string;
}
