import { connectToDatabase } from './mongodb';

/**
 * Initialize the database connection and perform any setup tasks
 * This can be called during app initialization
 */
export async function initializeDatabase() {
  try {
    console.log('Initializing database connection...');
    const { db, client } = await connectToDatabase();
    
    // Create indexes for better query performance
    await Promise.all([
      // User collection indexes
      db.collection('users').createIndex({ email: 1 }, { unique: true }),
      db.collection('users').createIndex({ createdAt: -1 }),
      
      // FashionItem collection indexes
      db.collection('fashionItems').createIndex({ category: 1 }),
      db.collection('fashionItems').createIndex({ type: 1 }),
      db.collection('fashionItems').createIndex({ color: 1 }),
      db.collection('fashionItems').createIndex({ occasions: 1 }),
      db.collection('fashionItems').createIndex({ seasons: 1 }),
      
      // Conversation collection indexes
      db.collection('conversations').createIndex({ userId: 1 }),
      db.collection('conversations').createIndex({ createdAt: -1 }),
    ]);
    
    console.log('Database initialized successfully');
    return { db, client };
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Check database health
export async function checkDatabaseHealth() {
  try {
    const { client } = await connectToDatabase();
    const adminDb = client.db().admin();
    
    // Check if we can execute a command on the database
    const result = await adminDb.ping();
    return result.ok === 1;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
