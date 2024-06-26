import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreateOrderDTO } from './dtos/create-order.dto';
  import { OrderService } from './order.service';
import { UserId } from '../decorators/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiBearerAuth()  
  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
      @Body() createOrderDTO: CreateOrderDTO,
      @Param('cartId') cartId: number,
      @UserId() userId: number,
    ) {
      return this.orderService.createOrder(createOrderDTO, userId);
    }

    @Get()
    async findOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
      return this.orderService.findOrdersByUserId(userId);
    }
  }