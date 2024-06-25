import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategory } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findAll();
    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }
    return categories;
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneById(categoryId);

    if (!category) {
      throw new NotFoundException(`Category id: ${categoryId} not found`);
    }

    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneByName(name);
    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`);
    }
    return category;
  }

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );
    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} exist`,
      );
    }
    return this.categoryRepository.save(createCategory as CategoryEntity);
  }
}
