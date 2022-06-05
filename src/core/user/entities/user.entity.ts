import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../base.entity';
import { Role } from '../../role/entities/role.entity';
import { Status } from '../../status/entities/status.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column('varchar', { unique: true, nullable: false }) email: string;
    @Column('varchar', { nullable: false, select: false }) password: string;
    @Column('varchar', { nullable: false }) firstname: string;
    @Column('varchar', { nullable: false }) lastname: string;
    @Column('varchar', { nullable: false }) companyName: string;

    @Column('numeric', { nullable: false }) sirenNumber: number;

    @Column('numeric', { nullable: false }) phone: number;
    @Column('boolean', { default: false }) newsletter: boolean;
    @ManyToOne(() => Role, { eager: true }) role?: Role | null;
    @ManyToOne(() => Status, { eager: true }) status?: Status;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}
