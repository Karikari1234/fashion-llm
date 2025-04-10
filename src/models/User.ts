import { db } from '@/lib/db';
import { User, StylePreferences } from '@/types';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

const COLLECTION = 'users';

/**
 * Convert MongoDB document to User type
 */
function mapToUser(doc: any): User | null {
  if (!doc) return null;
  
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    profileImage: doc.profileImage,
    stylePreferences: doc.stylePreferences,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const doc = await db.findById(COLLECTION, id);
    return mapToUser(doc);
  } catch (error) {
    console.error(`Error getting user with ID ${id}:`, error);
    return null;
  }
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const doc = await db.findMany(COLLECTION, { email }, { limit: 1 });
    return doc.length ? mapToUser(doc[0]) : null;
  } catch (error) {
    console.error(`Error getting user with email ${email}:`, error);
    return null;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: Partial<User> & { password: string }): Promise<User | null> {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Remove password from the User object and store in separate field
    const { password, ...userWithoutPassword } = userData;
    
    const insertData = {
      ...userWithoutPassword,
      passwordHash: hashedPassword,
    };
    
    const result = await db.insertOne(COLLECTION, insertData);
    return mapToUser({ _id: result.id, ...insertData });
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

/**
 * Create or retrieve a user from OAuth data
 */
export async function findOrCreateUserFromOAuth(
  oauthData: {
    email: string;
    name?: string;
    image?: string;
  }
): Promise<User | null> {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(oauthData.email);
    if (existingUser) {
      return existingUser;
    }
    
    // Create new user if not exists
    const userData = {
      email: oauthData.email,
      name: oauthData.name || oauthData.email.split('@')[0],
      profileImage: oauthData.image || undefined,
    };
    
    const result = await db.insertOne(COLLECTION, userData);
    return mapToUser({ _id: result.id, ...userData });
  } catch (error) {
    console.error('Error finding or creating OAuth user:', error);
    return null;
  }
}

/**
 * Update a user's profile
 */
export async function updateUserProfile(id: string, profileData: Partial<User>): Promise<User | null> {
  try {
    // Ensure password isn't included in profile updates
    const { password, ...safeProfileData } = profileData as any;
    
    const updated = await db.updateById(COLLECTION, id, safeProfileData);
    return mapToUser(updated);
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return null;
  }
}

/**
 * Update a user's style preferences
 */
export async function updateStylePreferences(id: string, stylePreferences: Partial<StylePreferences>): Promise<User | null> {
  try {
    // Get current user to merge with existing preferences
    const currentUser = await getUserById(id);
    if (!currentUser) return null;
    
    // Merge existing preferences with updates
    const updatedPreferences = {
      ...currentUser.stylePreferences,
      ...stylePreferences,
    };
    
    const updated = await db.updateById(COLLECTION, id, {
      stylePreferences: updatedPreferences
    });
    
    return mapToUser(updated);
  } catch (error) {
    console.error(`Error updating style preferences for user ${id}:`, error);
    return null;
  }
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    // Directly query the collection to get the password hash
    const { db: database } = await import('@/lib/db/mongodb').then(mod => mod.connectToDatabase());
    const doc = await database.collection(COLLECTION).findOne({ email });
    
    if (!doc || !doc.passwordHash) return null;
    
    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, doc.passwordHash);
    
    if (!passwordMatch) return null;
    
    // Return user without password hash
    return mapToUser(doc);
  } catch (error) {
    console.error(`Error authenticating user with email ${email}:`, error);
    return null;
  }
}
