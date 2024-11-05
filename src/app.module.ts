import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { DepartmentModule } from './department/department.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5438,
      username: "user_admin",
      password: "root",
      database: "db_adminDW",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    InventoryModule,
    DepartmentModule,
    CategoryModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
