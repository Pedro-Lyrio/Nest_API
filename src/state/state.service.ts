import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entiy';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllState(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }
}