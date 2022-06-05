import { plainToClass } from 'class-transformer';
import { CompanyTypeEntity } from 'src/core/company-type/entities/company-type.entity';
import { UserEntity } from 'src/core/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Company } from '../../core/company/entities/company.entity';

export default class CreateCompany implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(Company, 'Company').getCount();

        const user = await connection
            .createQueryBuilder()
            .select('user')
            .from(UserEntity, 'user')
            .where('user.sirenNumber = :sirenNumber', { sirenNumber: '847770948' })
            .getOne();

        const brasserie = await connection
            .createQueryBuilder()
            .select('companyType')
            .from(CompanyTypeEntity, 'companyType')
            .where('companyType.code = :code', { code: '5630Z' })
            .getOne();

        console.log('user', user);
        console.log('brasserie', brasserie);

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(Company)
                .values([
                    plainToClass(Company, {
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
                        user: user.id,
                        companyType: brasserie.id,
                    }),
                ])
                .execute();
        }
    }
}
