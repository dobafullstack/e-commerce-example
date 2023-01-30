import { Module } from '@nestjs/common';
import dataSource from '../../ormconfig';

@Module({
	providers: [
		{
			provide: 'DATA_SOURCE',
			useFactory: () => dataSource.initialize()
		}
	]
})
export class DatabaseModule {}
