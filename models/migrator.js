import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function listPendingMigrations() {
  let dbclient;

  try {
    dbclient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient: dbclient,
    });

    return pendingMigrations;
  } finally {
    await dbclient?.end();
  }
}

async function runPendingMigrations() {
  let dbclient;

  try {
    dbclient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient: dbclient,
      dryRun: false,
    });
    return migratedMigrations;
  } finally {
    await dbclient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
