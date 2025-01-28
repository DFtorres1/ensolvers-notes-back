import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738089269622 implements MigrationInterface {
  name = 'Migration1738089269622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_82b3b83064939ec24c014af183c"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag_notes_note" ("tagId" integer NOT NULL, "noteId" integer NOT NULL, CONSTRAINT "PK_833cbd88cf72020bcf0aa444250" PRIMARY KEY ("tagId", "noteId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6663c0564ae59d5a494ff62477" ON "tag_notes_note" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1348229852f6b66c5072db4999" ON "tag_notes_note" ("noteId") `,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "noteId"`);
    await queryRunner.query(
      `ALTER TABLE "tag_notes_note" ADD CONSTRAINT "FK_6663c0564ae59d5a494ff624777" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_notes_note" ADD CONSTRAINT "FK_1348229852f6b66c5072db4999e" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag_notes_note" DROP CONSTRAINT "FK_1348229852f6b66c5072db4999e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_notes_note" DROP CONSTRAINT "FK_6663c0564ae59d5a494ff624777"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" ADD "noteId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1348229852f6b66c5072db4999"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6663c0564ae59d5a494ff62477"`,
    );
    await queryRunner.query(`DROP TABLE "tag_notes_note"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_82b3b83064939ec24c014af183c" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
