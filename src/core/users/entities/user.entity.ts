import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
import { BaseEntity } from '../../base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends BaseEntity {


    @Column('varchar', { nullable: false }) password: string;
    @Column('varchar', { nullable: false, unique: true }) email: string;
    @Column('varchar', { nullable: false }) firstname: string;
    @Column('varchar', { nullable: false }) lastname: string;
    @Column('varchar', { nullable: false }) companyName: string;

    @ApiProperty({ example: 231654321, description: 'The age of the Cat' })
    @Column('numeric', { nullable: false }) siretNumber: number;

    @Column('numeric', { nullable: false }) phone: number;
    @Column('boolean', { default: false }) newsletter: boolean;
    @ManyToOne(() => Role, { eager: true }) role?: Role | null;
    @ManyToOne(() => Status, { eager: true }) status?: Status;

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}
