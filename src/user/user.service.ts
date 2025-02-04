import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Реєстрація користувача
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Отримання користувача за email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

// Отримання користувача за id
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

// Отримання списку користувачів з фільтрацією
  async findAll(filterDto: FilterUserDto): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (filterDto.id) {
      query.andWhere('user.id = :id', { id: filterDto.id });
    }
    if (filterDto.email) {
      query.andWhere('user.email LIKE :email', { email: `%${filterDto.email}%` });
    }
    return query.getMany();
  }

// Оновлення даних користувача (тільки свого профілю)
  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

// Видалення користувача (тільки свого профілю)
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }}