require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
	TYPEORM_HOST,
	TYPEORM_PORT,
	TYPEORM_USERNAME,
	TYPEORM_PASSWORD,
	TYPEORM_DATABASE_NAME,
	NODE_ENV
} from './src/configs/env';

const ormConfig: DataSourceOptions = {
	type: 'mysql',
	host: process.env.TYPEORM_HOST,
	port: 3306,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE_NAME,
	logging: NODE_ENV === "development",
	synchronize: NODE_ENV !== 'production',
	entities: [join(__dirname, 'src', 'app', '**', 'entities', '*.entity.{js,ts}')],
	migrations: [join(__dirname, 'src', 'database', 'migrations', '*.{js,ts}')],
	migrationsTableName: 'migrations'
};

export default new DataSource(ormConfig);
