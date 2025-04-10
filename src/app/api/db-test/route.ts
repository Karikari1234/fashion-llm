import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db/init';

/**
 * API endpoint to check database health and connection status
 * GET /api/db-test
 */
export async function GET() {
  try {
    const isHealthy = await checkDatabaseHealth();
    
    if (isHealthy) {
      return NextResponse.json({
        status: 'success',
        message: 'Database connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database test endpoint error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
