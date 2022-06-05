import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { CompanyType } from '../../core/company-type/entities/company-type.entity';

export default class CreateCompanyType implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CompanyType, 'CompanyType').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CompanyType)
                .values([
                    plainToClass(CompanyType, { code: '5630Z', name: 'Débits de boissons' }),
                    plainToClass(CompanyType, { code: '1105Z', name: 'Fabrication de bière' }),
                    plainToClass(CompanyType, { code: '5610A', name: 'Restauration traditionnelle' }),
                ])
                .execute();
        }
    }
}
