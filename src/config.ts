import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(8086),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_SECRET_EXPIRATION: Joi.string().required(),
  JWT_REFRESH_SECRET_EXPIRATION: Joi.string().required(),
}).unknown();


const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  env: value.NODE_ENV,
  port: value.PORT,
  db: {
    host: value.DB_HOST,
    port: value.DB_PORT,
    user: value.DB_USER,
    password: value.DB_PASSWORD,
    name: value.DB_NAME,
  },
  jwtSecret: value.JWT_SECRET,
  jwtRefreshSecret: value.JWT_REFRESH_SECRET,
  jwtSecretExpiration: value.JWT_SECRET_EXPIRATION,
  jwtSecretRefreshExpiration: value.JWT_REFRESH_SECRET_EXPIRATION,
};

export default config;
