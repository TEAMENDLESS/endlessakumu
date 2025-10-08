import app from './app.js';
import { connectDatabase } from './config/archives/database.js';
import { PORT } from './config/archives/env.js';
import logger from './config/archives/logger.js';

const start = async () => {
  try {
    await connectDatabase();
    logger.info('Database connection established.');
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
};

void start();
