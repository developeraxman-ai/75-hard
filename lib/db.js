import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn('MONGODB_URI is not set');
}

const globalWithMongoose = globalThis;
const cache = globalWithMongoose.mongooseCache ?? (globalWithMongoose.mongooseCache = { conn: null, promise: null });

export async function connectDb() {
  if (cache.conn) return cache.conn;
  if (!uri) throw new Error('Missing MONGODB_URI');

  cache.promise ??= mongoose.connect(uri, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
