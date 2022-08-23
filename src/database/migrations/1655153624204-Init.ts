import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1655153624204 implements MigrationInterface {
    name = 'Init1655153624204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "code_naf" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2cbce5bbebd1af5c700abb70f9b" UNIQUE ("code"), CONSTRAINT "PK_4d493d10e549610210c2b7740bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'VISITEUR', 'REVENDEUR', 'PRODUCTEUR', 'DISTRIBUTEUR')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'TEMPORARY', 'INACTIVE', 'SUSPEND')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "companyName" character varying NOT NULL, "sirenNumber" numeric NOT NULL, "phone" numeric NOT NULL, "newsletter" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'VISITEUR', "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" text NOT NULL, "siretNumber" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "region" character varying NOT NULL, "zipcode" character varying NOT NULL, "country" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying NOT NULL, "facebook" character varying NOT NULL, "instagram" character varying NOT NULL, "linkedin" character varying NOT NULL, "userId" uuid, "codeNafId" uuid, CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_cb945a3561693907692670cdb4e" UNIQUE ("name"), CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "familyId" uuid, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_456a4a64c8a0b072c0cf8dd39e9" UNIQUE ("name"), CONSTRAINT "PK_722753196a878fa7473f0381da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."unit_unitcategory_enum" AS ENUM('VOLUME', 'POID', 'TEMPERATURE', 'PRESSION', 'TEMPS', 'MONNAIE')`);
        await queryRunner.query(`CREATE TYPE "public"."unit_countrycode_enum" AS ENUM('FR', 'EN')`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "unitCategory" "public"."unit_unitcategory_enum" NOT NULL, "countryCode" "public"."unit_countrycode_enum" NOT NULL, CONSTRAINT "UQ_ef3ea0364075cef33bbcad81e27" UNIQUE ("name", "symbol"), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "unitId" uuid, CONSTRAINT "UQ_bbef4062f67e3b435c1afd89fed" UNIQUE ("name"), CONSTRAINT "PK_3c5d89c1607d52ce265c7348f70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "productId" uuid, "filterId" uuid, CONSTRAINT "PK_0af87b1623a34dd5357bfdb38a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "tag" character varying NOT NULL, "productionId" uuid, "familyId" uuid, "categoryId" uuid, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_aea16ff665e17395aeca7bf3645" FOREIGN KEY ("codeNafId") REFERENCES "code_naf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_3fce23bf5539c2255121b26f373" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production" ADD CONSTRAINT "FK_a9ca4bd8d592db39cc9236278b5" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "filter" ADD CONSTRAINT "FK_4d8aa7309ab4e41108832f36ff6" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_15007f3ae19e9c5c84861174699" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_e12ed75c527056b21391a316bfe" FOREIGN KEY ("filterId") REFERENCES "filter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_5e7329e76bdf4e0baac747aaa8f" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c2cfbd12362dee6f88c50403d0b" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c2cfbd12362dee6f88c50403d0b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_5e7329e76bdf4e0baac747aaa8f"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_e12ed75c527056b21391a316bfe"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_15007f3ae19e9c5c84861174699"`);
        await queryRunner.query(`ALTER TABLE "filter" DROP CONSTRAINT "FK_4d8aa7309ab4e41108832f36ff6"`);
        await queryRunner.query(`ALTER TABLE "production" DROP CONSTRAINT "FK_a9ca4bd8d592db39cc9236278b5"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_3fce23bf5539c2255121b26f373"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_aea16ff665e17395aeca7bf3645"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "value"`);
        await queryRunner.query(`DROP TABLE "filter"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TYPE "public"."unit_countrycode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."unit_unitcategory_enum"`);
        await queryRunner.query(`DROP TABLE "production"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "code_naf"`);
    }

}
