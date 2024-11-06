import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Person } from 'src/person/entities/person.entity';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Person])],
  controllers: [DepartmentController],
  providers: [DepartmentService, PersonService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
