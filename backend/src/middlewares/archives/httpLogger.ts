import { pinoHttp } from 'pino-http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import logger from '../../config/archives/logger.js'; 


const httpLogger = pinoHttp({
  logger,
  customLogLevel: (_req: IncomingMessage, res: ServerResponse, err?: Error) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customProps: (_req: IncomingMessage, res: ServerResponse) => ({
    responseTime: (res as any).responseTime,
  }),
});

export default httpLogger;
