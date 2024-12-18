import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Create a new connection if it doesn't exist
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
let cached = global._mongooseCache;

if (!cached) {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectToDatabase };
