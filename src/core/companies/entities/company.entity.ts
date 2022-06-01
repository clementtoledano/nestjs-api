import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/core/base.entity";
import { CompanyType } from "src/core/company-types/entities/company-type.entity";
import { Column, Entity, ManyToOne } from "typeorm";



@Entity('company')
export class Company extends BaseEntity {
    @ApiProperty({ example: 'Brasserie Malpest' })
    @Column('varchar', { nullable: false })
    label: string;

    @ApiProperty({ example: 'Brasserie Malpest' })
    @Column('text', { nullable: false })
    description: string;

    @ApiProperty({ example: '123123132132' })
    @Column('varchar', { nullable: false })
    siret: string;
    
    @ApiProperty({ example: '19 rue de la peste' })
    @Column('varchar', { nullable: false })
    address: string;
    
    @ApiProperty({ example: 'Beziers' })
    @Column('varchar', { nullable: false })
    city: string;
    
    @ApiProperty({ example: 'Herault' })
    @Column('varchar', { nullable: false })
    region: string;
    
    @ApiProperty({ example: '34500' })
    @Column('varchar', { nullable: false })
    zipcode: string;
    
    @ApiProperty({ example: 'France' })
    @Column('varchar', { nullable: false })
    country: string;
    
    @ApiProperty({ example: '0606080806' })
    @Column('varchar', { nullable: false })
    phone: string;
    
    @ApiProperty({ example: 'braserie-pest@gmail.com' })
    @Column('varchar', { nullable: false })
    email: string;
    
    @ApiProperty({ example: 'www.brassrie-pest.com' })
    @Column('varchar', { nullable: false })
    website?: string;
    
    @ApiProperty({ example: 'www.facebook.com/bp' })
    @Column('varchar', { nullable: false })
    facebook?: string;
    
    @ApiProperty({ example: 'www.instagram.com/bp' })
    @Column('varchar', { nullable: false })
    instagram?: string;
    
    @ApiProperty({ example: 'www.linked.in/bp' })
    @Column('varchar', { nullable: false })
    linkedin?: string;

    @ManyToOne(() => CompanyType, { eager: true }) companyType?: CompanyType | null;
}
