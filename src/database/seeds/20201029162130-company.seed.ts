import { plainToClass } from 'class-transformer';
import { CompanyType } from 'src/core/company-types/entities/company-type.entity';
import { User } from 'src/core/users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Company } from '../../core/companies/entities/company.entity';

export default class CreateCompany implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(Company, 'Company').getCount();

        const user = await connection.createQueryBuilder().select().from(User, 'User').where("User.sirenNumber = :sirenNumber", { sirenNumber: 847770948 }).getOne();
        const brasserie = await connection.createQueryBuilder().select().from(CompanyType, 'CompanyType').where("code = :code", { code: '5630Z' }).getOne();


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
