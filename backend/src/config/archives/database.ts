import { Sequelize } from 'sequelize';
import { DB, IS_PROD } from './env.js';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB.host,
  port: DB.port,
  username: DB.user,
  password: DB.pass,
  database: DB.name,
  logging: DB.logging ? console.log : false,
  dialectOptions: DB.ssl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  pool: {
    min: DB.pool.min,
    max: DB.pool.max,
    idle: DB.pool.idle,
  },
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected [${IS_PROD ? 'PROD' : 'DEV'}]`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
