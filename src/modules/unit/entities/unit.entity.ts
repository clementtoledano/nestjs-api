import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "../../../shared/base.entity";
import { Column, Entity, Unique } from "typeorm";
import { UnitCategoryEnum } from "../../../constants/unit-category.enum";
import { CountryCodeEnum } from "../../../constants/country-code.enum";

@Unique(["name", "symbol"])
@Entity('unit')
export class UnitEntity extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'centilitre' })
    @Column()
    name: string;

    @Allow() //si rien de mieux
    @ApiProperty({ example: 'cl' })
    @Column()
    symbol: string;

    @Column({ type: 'enum', enum: UnitCategoryEnum }) unitCategory?: UnitCategoryEnum;
    @Column({ type: 'enum', enum: CountryCodeEnum }) countryCode?: CountryCodeEnum;
}

export class UnitRepositoryFake {
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