import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../../shared/base.entity';


@Entity('company_type')
export class CompanyTypeEntity extends BaseEntity {

    @Allow() //si rien de mieux
    @ApiProperty({ example: '5630Z' })
    @Column({ unique: true, })
    code: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Débits de boissons' })
    @Column()
    name: string;
}

export class CompanyTypeRepositoryFake {
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
