import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { CompanyTypeEntity } from '../../core/company-type/entities/company-type.entity';

export default class CreateCompanyType implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CompanyTypeEntity, 'CompanyType').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CompanyTypeEntity)
                .values([
                    plainToClass(CompanyTypeEntity, { code: '5630Z', name: 'Débits de boissons' }),
                    plainToClass(CompanyTypeEntity, { code: '1105Z', name: 'Fabrication de bière' }),
                    plainToClass(CompanyTypeEntity, { code: '5610A', name: 'Restauration traditionnelle' }),
                ])
                .execute();
        }
    }
}
