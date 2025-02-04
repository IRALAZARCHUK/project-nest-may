import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import configuration from './config/configuration';

dotenv.config(); // Завантажуємо змінні середовища

const config = configuration();

export default new DataSource({
  type: config.database.type as any,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
