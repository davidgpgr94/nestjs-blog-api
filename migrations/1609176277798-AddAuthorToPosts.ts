import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthorToPosts1609176277798 implements MigrationInterface {
  name = 'AddAuthorToPosts1609176277798'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
    await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, "authorId" integer, CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"))`);
    await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "text", "createdAt", "updatedAt", "slug") SELECT "id", "title", "text", "createdAt", "updatedAt", "slug" FROM "post"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_c6fb082a3114f35d0cc27c518e" ON "post" ("authorId") `);
    await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
    await queryRunner.query(`DROP INDEX "IDX_c6fb082a3114f35d0cc27c518e"`);
    await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, "authorId" integer, CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"), CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "text", "createdAt", "updatedAt", "slug", "authorId") SELECT "id", "title", "text", "createdAt", "updatedAt", "slug", "authorId" FROM "post"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_c6fb082a3114f35d0cc27c518e" ON "post" ("authorId") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_c6fb082a3114f35d0cc27c518e"`);
    await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
    await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
    await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, "authorId" integer, CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"))`);
    await queryRunner.query(`INSERT INTO "post"("id", "title", "text", "createdAt", "updatedAt", "slug", "authorId") SELECT "id", "title", "text", "createdAt", "updatedAt", "slug", "authorId" FROM "temporary_post"`);
    await queryRunner.query(`DROP TABLE "temporary_post"`);
    await queryRunner.query(`CREATE INDEX "IDX_c6fb082a3114f35d0cc27c518e" ON "post" ("authorId") `);
    await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
    await queryRunner.query(`DROP INDEX "IDX_c6fb082a3114f35d0cc27c518e"`);
    await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
    await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
    await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"))`);
    await queryRunner.query(`INSERT INTO "post"("id", "title", "text", "createdAt", "updatedAt", "slug") SELECT "id", "title", "text", "createdAt", "updatedAt", "slug" FROM "temporary_post"`);
    await queryRunner.query(`DROP TABLE "temporary_post"`);
    await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
  }

}
