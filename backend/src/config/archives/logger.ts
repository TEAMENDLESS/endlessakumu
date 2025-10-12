import pino from "pino";
import { IS_PROD, LOG_LEVEL, PRETTY_LOGS } from "./env.js";

const logger = pino({
  level: LOG_LEVEL,
  base: null,
  ...(IS_PROD
    ? {}
    : PRETTY_LOGS && {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname",
          },
        },
      }),
});

export default logger;
