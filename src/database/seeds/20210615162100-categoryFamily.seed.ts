import { plainToClass } from 'class-transformer';
import { CategoryFamilyEntity } from 'src/core/category-family/entities/category-family.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


export default class CreateCategoryFamily implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CategoryFamilyEntity, 'CatagoryFamily').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CategoryFamilyEntity)
                .values([
                    plainToClass(CategoryFamilyEntity, { name: 'Boisson alcoolisée' }),
                    plainToClass(CategoryFamilyEntity, { name: 'Boisson sans alcool' }),
                    plainToClass(CategoryFamilyEntity, { name: 'Epicerie salée' }),
                    plainToClass(CategoryFamilyEntity, { name: 'Epicerie sucrée' }),
                ])
                .execute();
        }
    }
}
