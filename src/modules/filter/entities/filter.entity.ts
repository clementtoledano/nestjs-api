import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { UnitEntity } from "../../../modules/unit/entities/unit.entity";
import { ValueEntity } from "../../../modules/value/entities/value.entity";

@Unique(["name"])
@Entity('filter')
export class FilterEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Couleur' })
    @Column()
    name: string;

    @OneToMany(() => ValueEntity, value => value.filter)
    public values?: ValueEntity[];

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