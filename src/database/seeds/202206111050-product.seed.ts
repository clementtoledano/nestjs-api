import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { ProductEntity } from '../../core/product/entities/product.entity';
import { CompanyEntity } from '../../core/company/entities/company.entity';
import { FamilyEntity } from '../../core/family/entities/family.entity';
import { ProductionEntity } from '../../core/production/entities/production.entity';

export default class CreatProduct implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(ProductEntity, 'Product').getCount();

        const company = await connection
            .createQueryBuilder()
            .select('company')
            .from(CompanyEntity, 'company')
            .where('company.label = :label', { label: 'Brasserie Malpest' })
            .getOne();

        const family = await connection
            .createQueryBuilder()
            .select('family')
            .from(FamilyEntity, 'family')
            .where('family.name = :name', { name: 'Boisson alcoolisée' })
            .getOne();

        const production = await connection
            .createQueryBuilder()
            .select('production')
            .from(ProductionEntity, 'production')
            .where('production.name = :name', { name: 'Gamme Délirium' })
            .getOne();


        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(ProductEntity)
                .values([
                    plainToClass(ProductEntity, {
                        label: 'Brasserie Malpest',
                        description: 'Production de bière artisanale',
                        siretNumber: '84777094800028',
                        address: '18 rue de la gare',
                        city: 'Béziers',
                        region: 'Herault',
                        zipcode: '34500',
                        country: 'France',
                        phone: '0651532351',
                        email: 'malpest@gmail.com',
                        website: 'www.google.fr',
                        facebook: 'www.facebook.fr',
                        instagram: 'www.instagram.fr',
                        linkedin: 'www.linkedin.fr',
                        company: company.id,
                        family: family.id,
                        production: production.id,
                    }),
                ])
                .execute();
        }
    }
}
