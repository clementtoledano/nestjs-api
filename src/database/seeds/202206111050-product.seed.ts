import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { ProductEntity } from '../../modules/product/entities/product.entity';
import { CompanyEntity } from '../../modules/company/entities/company.entity';
import { FamilyEntity } from '../../modules/family/entities/family.entity';
import { ProductionEntity } from '../../modules/production/entities/production.entity';

export default class CreateProduct implements Seeder {
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
                        name: 'Délirium Tremens',
                        description: 'Biere blonde forte',
                        tag: '',

                        company: company?.id,
                        family: family?.id,
                        production: production?.id,
                    }),
                ])
                .execute();
        }
    }
}
