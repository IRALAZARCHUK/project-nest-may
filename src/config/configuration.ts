export default () => ({
  database: {
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'nest_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'SUPER_SECRET_KEY',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3600s',
  },
});
