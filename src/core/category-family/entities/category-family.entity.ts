import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, Unique } from "typeorm";


@Unique(["name"])
@Entity('category_family')
export class CategoryFamilyEntity extends BaseEntity {


    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Boison alcoolisée' })
    @Column()
    name: string;


}

export class CategoryFamilyRepositoryFake {
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