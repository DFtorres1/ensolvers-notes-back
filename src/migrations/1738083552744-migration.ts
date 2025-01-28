import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738083552744 implements MigrationInterface {
  name = 'Migration1738083552744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(63) NOT NULL, "color" character varying, "noteId" integer, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_82b3b83064939ec24c014af183c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_82b3b83064939ec24c014af183c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
