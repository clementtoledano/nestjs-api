

import { FilterEntity } from "../../../core/filter/entities/filter.entity";
import { ProductEntity } from "../../../core/product/entities/product.entity";
import { BaseEntity } from "../../../shared/base.entity";
import { Entity, Column, ManyToOne } from "typeorm"


@Entity('value')
export class ValueEntity extends BaseEntity {


    @Column()
    public value!: string


    @ManyToOne(() => ProductEntity, { eager: true }) product: ProductEntity;

    @ManyToOne(() => FilterEntity, { eager: true }) filter: FilterEntity;
}

export class ValueRepositoryFake {
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