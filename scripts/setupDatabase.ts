import { initDatabase } from '../lib/initDatabase';

async function setup() {
  try {
    await initDatabase();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setup();
