import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { CodeNafEntity } from '../../core/code-naf/entities/code-naf.entity';
import { UserEntity } from '../../core/user/entities/user.entity';
import { CompanyEntity } from '../../core/company/entities/company.entity';

export default class CreateCompany implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CompanyEntity, 'Company').getCount();

        const user = await connection
            .createQueryBuilder()
            .select('user')
            .from(UserEntity, 'user')
            .where('user.sirenNumber = :sirenNumber', { sirenNumber: '847770948' })
            .getOne();
        console.log("🚀 . CreateCompany . run . user", user);

        const brasserie = await connection
            .createQueryBuilder()
            .select('codeNaf')
            .from(CodeNafEntity, 'codeNaf')
            .where('codeNaf.code = :code', { code: '5630Z' })
            .getOne();
        console.log("🚀 . CreateCompany . run . brasserie", brasserie);

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CompanyEntity)
                .values([
                    plainToClass(CompanyEntity, {
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
                        codeNaf: brasserie.id,
                    }),
                ])
                .execute();
        }
    }
}
