import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL_APPLICATION;
const MONGODB_URL_USERS = process.env.MONGODB_URL;

// Global cache to persist connections across hot reloads in Next.js
interface MongooseCache {
  application: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
  users: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached: MongooseCache = (global as any).mongooseMulti;

if (!cached) {
  cached = (global as any).mongooseMulti = {
    application: { conn: null, promise: null },
    users: { conn: null, promise: null },
  };
}

export async function getApplicationConnection(): Promise<mongoose.Connection> {
  if (cached.application.conn) return cached.application.conn;

  if (!cached.application.promise) {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL_APPLICATION is not defined");
    }
    const opts = {
      bufferCommands: false,
    };
    // Use createConnection for isolation
    cached.application.promise = mongoose.createConnection(MONGODB_URL, opts).asPromise();
  }

  try {
    cached.application.conn = await cached.application.promise;
  } catch (e) {
    cached.application.promise = null;
    throw e;
  }
  return cached.application.conn;
}

export async function getUsersConnection(): Promise<mongoose.Connection> {
  if (cached.users.conn) return cached.users.conn;

  if (!cached.users.promise) {
    if (!MONGODB_URL_USERS) {
      throw new Error("MONGODB_URL (Users) is not defined");
    }
    const opts = {
      bufferCommands: false,
    };
    // Use createConnection for isolation
    cached.users.promise = mongoose.createConnection(MONGODB_URL_USERS, opts).asPromise();
  }

  try {
    cached.users.conn = await cached.users.promise;
  } catch (e) {
    cached.users.promise = null;
    throw e;
  }
  return cached.users.conn;
}

// Global default connection (for backward compatibility if needed, though isolated is preferred)
export async function databaseConnection() {
    return getApplicationConnection();
}

export async function userdatabaseConnection() {
    return getUsersConnection();
}
