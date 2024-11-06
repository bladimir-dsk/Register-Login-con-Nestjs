import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Department } from 'src/department/entities/department.entity';
import { DepartmentService } from 'src/department/department.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Person } from 'src/person/entities/person.entity';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Department, Category, Person])],
  controllers: [InventoryController],
  providers: [InventoryService, DepartmentService, CategoryService, PersonService],
})
export class InventoryModule {}
