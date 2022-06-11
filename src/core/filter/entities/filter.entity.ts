import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { UnitEntity } from "../../../core/unit/entities/unit.entity";

@Unique(["name"])
@Entity('Filter')
export class FilterEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Couleur' })
    @Column()
    name: string;

    @ManyToOne(() => UnitEntity, { eager: true }) unit?: UnitEntity;

}

export class FilterRepositoryFake {
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