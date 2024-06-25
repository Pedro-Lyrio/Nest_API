import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findOneById(categoryId: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
  }

  async findOneByName(name: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({
      where: {
        name,
      },
    });
  }

  async save(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.save(category);
  }
}
