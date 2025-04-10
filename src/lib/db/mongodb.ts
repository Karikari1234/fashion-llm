import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'fashionai';

// These options configure how MongoDB handles connections and retries
const options: MongoClientOptions = {
  maxPoolSize: 10, // Adjust based on expected concurrent connections
  minPoolSize: 5, // Keep minimum connections ready
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 30000, // 30 seconds
  // MongoDB driver's built-in retry logic
  retryWrites: true,
  retryReads: true,
  // Auto reconnect logic
  serverSelectionTimeoutMS: 10000,
};

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
// during API Route usage.
declare global {
  // eslint-disable-next-line no-var
  var mongodb: { client: MongoClient | null; promise: Promise<MongoClient> | null };
}

let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { client: null, promise: null };
}

// Simple retry function that doesn't require external packages
async function connectWithRetry(
  client: MongoClient,
  maxRetries = 5,
  delay = 1000
): Promise<MongoClient> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await client.connect();
    } catch (error) {
      retries++;
      console.error(`MongoDB connection error (attempt ${retries}/${maxRetries}):`, error);

      if (retries >= maxRetries) {
        throw error;
      }

      // Exponential backoff
      const backoffDelay = delay * Math.pow(1.5, retries);
      console.log(`Retrying connection in ${backoffDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  // This should never be reached due to the throw in the catch block
  throw new Error('Failed to connect to MongoDB after maximum retries');
}

export async function connectToDatabase() {
  if (cached.client) {
    return { client: cached.client, db: cached.client.db(dbName) };
  }

  if (!cached.promise) {
    const client = new MongoClient(uri, options);

    cached.promise = connectWithRetry(client)
      .then(client => {
        console.log('MongoDB successfully connected');
        return client;
      })
      .catch(error => {
        console.error('MongoDB connection failed after retries:', error);
        throw error;
      });
  }

  try {
    cached.client = await cached.promise;
    return { client: cached.client, db: cached.client.db(dbName) };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// Helper function to handle database operations with error handling
export async function dbOperation<T>(operation: (db: unknown) => Promise<T>): Promise<T> {
  try {
    const { db } = await connectToDatabase();
    return await operation(db);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

// Clean up function for tests or development
export async function closeMongoDBConnection() {
  if (cached.client) {
    await cached.client.close();
    cached.client = null;
    cached.promise = null;
  }
}
