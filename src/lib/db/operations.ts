import { ObjectId } from 'mongodb';
import { dbOperation } from './mongodb';

/**
 * Common database operations abstracted for reuse across the application
 */

/**
 * Find a single document by ID
 */
export async function findById(collection: string, id: string) {
  return dbOperation(async (db) => {
    try {
      return await db.collection(collection).findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error(`Error finding document in ${collection} by ID ${id}:`, error);
      throw error;
    }
  });
}

/**
 * Find documents with optional query, pagination, and sorting
 */
export async function findMany(
  collection: string, 
  query = {}, 
  options = { 
    limit: 50, 
    skip: 0, 
    sort: { createdAt: -1 } 
  }
) {
  return dbOperation(async (db) => {
    try {
      return await db
        .collection(collection)
        .find(query)
        .skip(options.skip)
        .limit(options.limit)
        .sort(options.sort)
        .toArray();
    } catch (error) {
      console.error(`Error finding documents in ${collection}:`, error);
      throw error;
    }
  });
}

/**
 * Insert a single document
 */
export async function insertOne(collection: string, document: any) {
  return dbOperation(async (db) => {
    try {
      const result = await db.collection(collection).insertOne({
        ...document,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: result.insertedId, ...document };
    } catch (error) {
      console.error(`Error inserting document into ${collection}:`, error);
      throw error;
    }
  });
}

/**
 * Update a single document by ID
 */
export async function updateById(collection: string, id: string, update: any) {
  return dbOperation(async (db) => {
    try {
      const result = await db.collection(collection).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...update,
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      );
      return result.value;
    } catch (error) {
      console.error(`Error updating document in ${collection} with ID ${id}:`, error);
      throw error;
    }
  });
}

/**
 * Delete a single document by ID
 */
export async function deleteById(collection: string, id: string) {
  return dbOperation(async (db) => {
    try {
      const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error(`Error deleting document from ${collection} with ID ${id}:`, error);
      throw error;
    }
  });
}

/**
 * Count documents in a collection with optional query
 */
export async function countDocuments(collection: string, query = {}) {
  return dbOperation(async (db) => {
    try {
      return await db.collection(collection).countDocuments(query);
    } catch (error) {
      console.error(`Error counting documents in ${collection}:`, error);
      throw error;
    }
  });
}
