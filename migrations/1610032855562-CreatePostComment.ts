import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePostComment1610032855562 implements MigrationInterface {
    name = 'CreatePostComment1610032855562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, "postId" integer NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_276779da446413a0d79598d4fb" ON "comment" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_94a85bb16d24033a2afdd5df06" ON "comment" ("postId") `);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`DROP INDEX "IDX_276779da446413a0d79598d4fb"`);
        await queryRunner.query(`DROP INDEX "IDX_94a85bb16d24033a2afdd5df06"`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, "postId" integer NOT NULL, CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "text", "createdAt", "updatedAt", "authorId", "postId") SELECT "id", "text", "createdAt", "updatedAt", "authorId", "postId" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_276779da446413a0d79598d4fb" ON "comment" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_94a85bb16d24033a2afdd5df06" ON "comment" ("postId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_94a85bb16d24033a2afdd5df06"`);
        await queryRunner.query(`DROP INDEX "IDX_276779da446413a0d79598d4fb"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, "postId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "text", "createdAt", "updatedAt", "authorId", "postId") SELECT "id", "text", "createdAt", "updatedAt", "authorId", "postId" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`CREATE INDEX "IDX_94a85bb16d24033a2afdd5df06" ON "comment" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_276779da446413a0d79598d4fb" ON "comment" ("authorId") `);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`DROP INDEX "IDX_94a85bb16d24033a2afdd5df06"`);
        await queryRunner.query(`DROP INDEX "IDX_276779da446413a0d79598d4fb"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
    }

}
