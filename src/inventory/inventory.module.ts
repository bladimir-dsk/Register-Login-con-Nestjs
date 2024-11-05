import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Department } from 'src/department/entities/department.entity';
import { DepartmentService } from 'src/department/department.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Department, Category])],
  controllers: [InventoryController],
  providers: [InventoryService, DepartmentService, CategoryService],
})
export class InventoryModule {}
