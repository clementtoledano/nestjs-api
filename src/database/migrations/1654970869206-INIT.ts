import {MigrationInterface, QueryRunner} from "typeorm";

export class INIT1654970869206 implements MigrationInterface {
    name = 'INIT1654970869206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "code_naf" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2cbce5bbebd1af5c700abb70f9b" UNIQUE ("code"), CONSTRAINT "PK_4d493d10e549610210c2b7740bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_cb945a3561693907692670cdb4e" UNIQUE ("name"), CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "familyId" uuid, CONSTRAINT "UQ_0ac420e8701e781dbf1231dc230" UNIQUE ("name"), CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "companyName" character varying NOT NULL, "sirenNumber" numeric NOT NULL, "phone" numeric NOT NULL, "newsletter" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT '2', "status" "public"."user_status_enum" NOT NULL DEFAULT '1', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" text NOT NULL, "siretNumber" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "region" character varying NOT NULL, "zipcode" character varying NOT NULL, "country" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying NOT NULL, "facebook" character varying NOT NULL, "instagram" character varying NOT NULL, "linkedin" character varying NOT NULL, "userId" uuid, "codeNafId" uuid, CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Production" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_dc94c89d30eaf0e364416638df1" UNIQUE ("name"), CONSTRAINT "PK_186436fa663c137b77bc2a1dce0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Unit_unitcategory_enum" AS ENUM('1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TYPE "public"."Unit_countrycode_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "Unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "unitCategory" "public"."Unit_unitcategory_enum" NOT NULL, "countryCode" "public"."Unit_countrycode_enum" NOT NULL, CONSTRAINT "UQ_8f96d61fcf25788d8f7df98e347" UNIQUE ("name", "symbol"), CONSTRAINT "PK_0a83556fc363a57bdeee23f9a9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Filter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "unitId" uuid, CONSTRAINT "UQ_b73f9ad53e06c7a3a9c37826fc8" UNIQUE ("name"), CONSTRAINT "PK_a721cf0609d4b17892134af6282" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, "productId" uuid, "filterId" uuid, CONSTRAINT "PK_0af87b1623a34dd5357bfdb38a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "tag" character varying NOT NULL, "productionId" uuid, "familyId" uuid, "categoryId" uuid, CONSTRAINT "UQ_08cd99ca921561a289373c14b42" UNIQUE ("name"), CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Category" ADD CONSTRAINT "FK_4d203c36c0688a8b6f7985c2aaf" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_aea16ff665e17395aeca7bf3645" FOREIGN KEY ("codeNafId") REFERENCES "code_naf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Production" ADD CONSTRAINT "FK_460960e98746b69535fe84aac86" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Filter" ADD CONSTRAINT "FK_0332ba36fc558bf80f267f40946" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_15007f3ae19e9c5c84861174699" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "value" ADD CONSTRAINT "FK_e12ed75c527056b21391a316bfe" FOREIGN KEY ("filterId") REFERENCES "Filter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_84e8b390a57036b845902bff337" FOREIGN KEY ("productionId") REFERENCES "Production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_7731c376f9c5390f77246559696" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_7731c376f9c5390f77246559696"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_84e8b390a57036b845902bff337"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_e12ed75c527056b21391a316bfe"`);
        await queryRunner.query(`ALTER TABLE "value" DROP CONSTRAINT "FK_15007f3ae19e9c5c84861174699"`);
        await queryRunner.query(`ALTER TABLE "Filter" DROP CONSTRAINT "FK_0332ba36fc558bf80f267f40946"`);
        await queryRunner.query(`ALTER TABLE "Production" DROP CONSTRAINT "FK_460960e98746b69535fe84aac86"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_aea16ff665e17395aeca7bf3645"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "Category" DROP CONSTRAINT "FK_4d203c36c0688a8b6f7985c2aaf"`);
        await queryRunner.query(`DROP TABLE "Product"`);
        await queryRunner.query(`DROP TABLE "value"`);
        await queryRunner.query(`DROP TABLE "Filter"`);
        await queryRunner.query(`DROP TABLE "Unit"`);
        await queryRunner.query(`DROP TYPE "public"."Unit_countrycode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Unit_unitcategory_enum"`);
        await queryRunner.query(`DROP TABLE "Production"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "Category"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "code_naf"`);
    }

}
