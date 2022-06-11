import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


import { FamilyEntity } from '../../core/family/entities/family.entity';
import { CategoryEntity } from '../../core/category/entities/category.entity';

export default class CreateCategory implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CategoryEntity, 'Category').getCount();

        const familyBA = await connection
            .createQueryBuilder()
            .select('family')
            .from(FamilyEntity, 'family')
            .where('family.name = :name', { name: 'Boisson alcoolisée' })
            .getOne();

        const familyBSA = await connection
            .createQueryBuilder()
            .select('family')
            .from(FamilyEntity, 'family')
            .where('family.name = :name', { name: 'Boisson sans alcool' })
            .getOne();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CategoryEntity)
                .values([
                    plainToClass(CategoryEntity, { name: 'Bière', family: familyBA.id }),
                    plainToClass(CategoryEntity, { name: 'Vin', family: familyBA.id }),
                    plainToClass(CategoryEntity, { name: 'Jus de fruit', family: familyBSA.id }),
                ])
                .execute();
        }
    }
}
