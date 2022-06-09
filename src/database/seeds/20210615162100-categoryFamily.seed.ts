import { plainToClass } from 'class-transformer';
import { FamilyEntity } from 'src/core/family/entities/family.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


export default class CreateFamily implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(FamilyEntity, 'CatagoryFamily').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(FamilyEntity)
                .values([
                    plainToClass(FamilyEntity, { name: 'Boisson alcoolisée' }),
                    plainToClass(FamilyEntity, { name: 'Boisson sans alcool' }),
                    plainToClass(FamilyEntity, { name: 'Epicerie salée' }),
                    plainToClass(FamilyEntity, { name: 'Epicerie sucrée' }),
                ])
                .execute();
        }
    }
}
