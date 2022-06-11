import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { CompanyEntity } from "../../company/entities/company.entity";

@Unique(["name"])
@Entity('Production')
export class ProductionEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Delirium' })
    @Column()
    name: string;

    @ManyToOne(() => CompanyEntity, { eager: true }) company: CompanyEntity;

}

export class ProductionRepositoryFake {
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