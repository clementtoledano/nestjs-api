import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { FamilyEntity } from "../../family/entities/family.entity";
import { CategoryEntity } from "../../../core/category/entities/category.entity";
import { ProductionEntity } from "../../../core/production/entities/production.entity";
import { ValueEntity } from "../../../core/value/entities/value.entity";

@Unique(["name"])
@Entity('Product')
export class ProductEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Délirium Tremens' })
    @Column()
    name: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Bière forte blonde de caractère' })
    @Column('text', { nullable: false })
    description: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: '' })
    @Column()
    tag: string;

    @OneToMany(() => ValueEntity, value => value.product)
    public values?: ValueEntity[];

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