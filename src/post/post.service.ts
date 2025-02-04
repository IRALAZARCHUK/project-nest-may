import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findByUser(userId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async create(user: User, createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create({ ...createPostDto, user });
    return this.postRepository.save(post);
  }

  async update(user: User, id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });

    if (!post) {
      throw new NotFoundException(`Пост з id ${id} не знайдено`);
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException('Ви можете редагувати лише свої пости');
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(user: User, id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });

    if (!post) {
      throw new NotFoundException(`Пост з id ${id} не знайдено`);
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException('Ви можете видаляти лише свої пости');
    }

    await this.postRepository.delete(id);
  }
}
