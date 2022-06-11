import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


import { CompanyEntity } from '../../core/company/entities/company.entity';
import { ProductionEntity } from '../../core/production/entities/production.entity';

export default class CreateProduction implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(ProductionEntity, 'Production').getCount();

        const company = await connection
            .createQueryBuilder()
            .select('company')
            .from(CompanyEntity, 'company')
            .where('company.label = :label', { label: 'Brasserie Malpest' })
            .getOne();


        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(ProductionEntity)
                .values([
                    plainToClass(ProductionEntity, { name: 'Gamme Délirium', company: company.id }),
                    plainToClass(ProductionEntity, { name: 'Gamme Floris', company: company.id }),
                ])
                .execute();
        }
    }
}
