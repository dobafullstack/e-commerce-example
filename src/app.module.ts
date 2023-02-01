import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { CategoryModule } from './app/category/category.module';

@Module({
	imports: [DatabaseModule, AuthModule, CategoryModule],
	controllers: [],
	providers: []
})
export class AppModule {}
