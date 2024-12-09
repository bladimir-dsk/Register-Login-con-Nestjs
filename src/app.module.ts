import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { DocumentTypeModule } from './document_type/document_type.module';
import { GeneredDocumentModule } from './genered_document/genered_document.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5439,
      username: "DocumentAdmin",
      password: "root",
      database: "db_documenta",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    StudentsModule,
    DocumentTypeModule,
    GeneredDocumentModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
