import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL_APPLICATION;

// @ts-ignore
let cached = (global as any).mongoose;

if (!cached) {
    // @ts-ignore
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function databaseConnection() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL_APPLICATION is not defined");
        }
        const opts = {
            dbName: "APPLICATION",
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URL, opts);
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}