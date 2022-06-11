import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { FamilyEntity } from "../../family/entities/family.entity";
import { CategoryEntity } from "../../../core/category/entities/category.entity";
import { ProductionEntity } from "../../../core/production/entities/production.entity";

@Unique(["name"])
@Entity('Product')
export class ProductEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Délirium Tremens' })
    @Column()
    name: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Bière forte blonde de caractère' })
    @Column()
    description: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Bière' })
    @Column()
    tag: string;

    @ManyToOne(() => ProductionEntity, { eager: true }) production: ProductionEntity;
    @ManyToOne(() => FamilyEntity, { eager: true }) family: FamilyEntity;
    @ManyToOne(() => CategoryEntity, { eager: true }) category: CategoryEntity;

}

export class ProductRepositoryFake {
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