import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '../../role/entities/role.entity';
import { StatusEntity } from '../../status/entities/status.entity';
import { BaseEntity } from '../../../shared/base.entity';

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

    @ManyToOne(() => RoleEntity, { eager: true }) role?: RoleEntity | null;
    @ManyToOne(() => StatusEntity, { eager: true }) status?: StatusEntity;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}

export class UserRepositoryFake {
    public create(): void {
        // do nothing.
    }
    public async save(): Promise<void> {
        // do nothing.
    }
    public async remove(): Promise<void> {
        // do nothing.
    }
    public async findOne(): Promise<void> {
        // do nothing.
    }
    public async find(): Promise<void> {
        // do nothing.
    }
}
