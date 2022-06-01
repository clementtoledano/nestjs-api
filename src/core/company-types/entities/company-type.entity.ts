import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { BaseEntity } from "src/core/base.entity";
import { Column, Entity } from "typeorm";


@Entity('company_type')
export class CompanyType extends BaseEntity {
    @Allow() //si rien de mieux
    @ApiProperty({ example: 'Débit de boisson' })
    @Column()
    name: string;
}
