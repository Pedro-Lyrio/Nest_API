import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';


@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}