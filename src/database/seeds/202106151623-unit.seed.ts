import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { CountryCodeEnum } from '../../constants/country-code.enum';
import { UnitCategoryEnum } from '../../constants/unit-category.enum';
import { UnitEntity } from '../../modules/unit/entities/unit.entity';

export default class CreateUnit implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(UnitEntity, 'Unit').getCount();


        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(UnitEntity)
                .values([
                    plainToClass(UnitEntity, {
                        name: 'Centilitre',
                        symbol: 'cl',
                        unitCategory: UnitCategoryEnum.VOLUME,
                        countryCode: CountryCodeEnum.FR,
                    }),
                    plainToClass(UnitEntity, {
                        name: 'Euro',
                        symbol: '€',
                        unitCategory: UnitCategoryEnum.MONNAIE,
                        countryCode: CountryCodeEnum.FR,
                    }),
                ])
                .execute();
        }
    }
}
