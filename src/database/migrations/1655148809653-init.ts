import {MigrationInterface, QueryRunner} from "typeorm";

export class init1655148809653 implements MigrationInterface {
    name = 'init1655148809653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_15007f3ae19e9c5c84861174699"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_e12ed75c527056b21391a316bfe"`);
        await queryRunner.query(`CREATE TYPE "public"."unit_unitcategory_enum" AS ENUM('VOLUME', 'POID', 'TEMPERATURE', 'PRESSION', 'TEMPS', 'MONNAIE')`);
        await queryRunner.query(`CREATE TYPE "public"."unit_countrycode_enum" AS ENUM('FR', 'EN')`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "unitCategory" "public"."unit_unitcategory_enum" NOT NULL, "countryCode" "public"."unit_countrycode_enum" NOT NULL, CONSTRAINT "UQ_ef3ea0364075cef33bbcad81e27" UNIQUE ("name", "symbol"), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "familyId" uuid, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_456a4a64c8a0b072c0cf8dd39e9" UNIQUE ("name"), CONSTRAINT "PK_722753196a878fa7473f0381da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "tag" character varying NOT NULL, "productionId" uuid, "familyId" uuid, "categoryId" uuid, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "unitId" uuid, CONSTRAINT "UQ_bbef4062f67e3b435c1afd89fed" UNIQUE ("name"), CONSTRAINT "PK_3c5d89c1607d52ce265c7348f70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'VISITEUR', 'REVENDEUR', 'PRODUCTEUR', 'DISTRIBUTEUR')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'VISITEUR'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'TEMPORARY', 'INACTIVE', 'SUSPEND')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING "status"::"text"::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_3fce23bf5539c2255121b26f373" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production" ADD CONSTRAINT "FK_a9ca4bd8d592db39cc9236278b5" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_5e7329e76bdf4e0baac747aaa8f" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c2cfbd12362dee6f88c50403d0b" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_15007f3ae19e9c5c84861174699" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_e12ed75c527056b21391a316bfe" FOREIGN KEY ("filterId") REFERENCES "filter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "filter" ADD CONSTRAINT "FK_4d8aa7309ab4e41108832f36ff6" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filter" DROP CONSTRAINT "FK_4d8aa7309ab4e41108832f36ff6"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_e12ed75c527056b21391a316bfe"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_15007f3ae19e9c5c84861174699"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c2cfbd12362dee6f88c50403d0b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_5e7329e76bdf4e0baac747aaa8f"`);
        await queryRunner.query(`ALTER TABLE "production" DROP CONSTRAINT "FK_a9ca4bd8d592db39cc9236278b5"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_3fce23bf5539c2255121b26f373"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum_old" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" TYPE "public"."user_status_enum_old" USING "status"::"text"::"public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum_old" RENAME TO "user_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "filter"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "production"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TYPE "public"."unit_countrycode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."unit_unitcategory_enum"`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_e12ed75c527056b21391a316bfe" FOREIGN KEY ("filterId") REFERENCES "Filter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_15007f3ae19e9c5c84861174699" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
