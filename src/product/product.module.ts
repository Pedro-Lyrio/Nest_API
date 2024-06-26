import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService],
  })
export class ProductModule {}
