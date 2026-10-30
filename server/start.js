import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import jsonServer from "json-server";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const databaseDirectory =
  process.env.DATA_DIR || serverDirectory;
const databasePath = path.join(databaseDirectory, "db.json");
const seedDatabasePath = path.join(serverDirectory, "db.json");

mkdirSync(databaseDirectory, { recursive: true });

if (!existsSync(databasePath)) {
  copyFileSync(seedDatabasePath, databasePath);
}

const server = jsonServer.create();
const router = jsonServer.router(databasePath);

server.use(jsonServer.defaults());
server.use(router);

const port = Number(process.env.PORT || 5000);
server.listen(port, "0.0.0.0", () => {
  console.log(`Hotel booking API listening on port ${port}`);
});
