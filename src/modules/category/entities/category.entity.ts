import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { FamilyEntity } from "../../../modules/family/entities/family.entity";

@Unique(["name"])
@Entity('Category')
export class CategoryEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Bière' })
    @Column()
    name: string;

    @ManyToOne(() => FamilyEntity, { eager: true }) family: FamilyEntity;

}

export class CategoryRepositoryFake {
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