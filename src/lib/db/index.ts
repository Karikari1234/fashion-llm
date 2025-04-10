export * from './mongodb';
export * from './operations';

// Re-export common operations with descriptive names for better developer experience
import { 
  findById, 
  findMany, 
  insertOne, 
  updateById, 
  deleteById, 
  countDocuments 
} from './operations';

export const db = {
  findById,
  findMany,
  insertOne,
  updateById,
  deleteById,
  count: countDocuments
};
