import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const defaultDbFromEnv = process.env.MONGODB_DB || process.env.MONGO_DB;

if (!uri) {
  console.warn(
    "MONGODB_URI is not set. MongoDB operations will fail until it's provided.",
  );
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;

  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient | undefined = (global as any)._mongoClient;
let clientPromise: Promise<MongoClient> | undefined = (global as any)
  ._mongoClientPromise;

function parseDbNameFromUri(
  connectionString: string | undefined,
): string | undefined {
  if (!connectionString) return undefined;

  const withoutQuery = connectionString.split("?")[0];

  const lastSlash = withoutQuery.lastIndexOf("/");
  if (lastSlash === -1) return undefined;
  const db = withoutQuery.substring(lastSlash + 1);
  return db || undefined;
}

function ensureClientInitialized(): Promise<MongoClient> {
  if (!client) {
    if (!uri) {
      return Promise.reject(new Error("MONGODB_URI is not defined."));
    }

    client = new MongoClient(uri);
    clientPromise = client.connect();

    try {
      (global as any)._mongoClient = client;
      (global as any)._mongoClientPromise = clientPromise;
    } catch (e) {}
  }

  return clientPromise as Promise<MongoClient>;
}

export async function getMongoClient(): Promise<MongoClient> {
  return ensureClientInitialized();
}

export async function getDb(dbName?: string): Promise<Db> {
  const conn = await ensureClientInitialized();

  const dbFromUri = parseDbNameFromUri(uri);
  const name = dbName || defaultDbFromEnv || dbFromUri || "admin";
  return conn.db(name);
}

export async function closeMongoClient(): Promise<void> {
  if (!client) return;
  try {
    await client.close();
  } finally {
    client = undefined;
    clientPromise = undefined;
    try {
      (global as any)._mongoClient = undefined;
      (global as any)._mongoClientPromise = undefined;
    } catch (e) {}
  }
}

export default getDb;
