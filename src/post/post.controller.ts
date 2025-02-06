import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Перегляд усіх постів' })
  @Get()
  async getAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'Перегляд постів конкретного користувача' })
  @Get(':userId')
  async getByUser(@Param('userId') userId: number) {
    return this.postService.findByUser(userId);
  }

  @ApiOperation({ summary: 'Створення посту' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: ExpressRequest, @Body() createPostDto: CreatePostDto) {
    const user = req.user;
    if (!user) {
      throw new Error('User not authenticated');
    }


    return this.postService.create(user, createPostDto);
  }

  @ApiOperation({ summary: 'Редагування посту' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req: ExpressRequest, @Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    const user = req.user;
    if (!user) {
      throw new Error('User not authenticated');
    }


    return this.postService.update(user, id, updatePostDto);
  }

  @ApiOperation({ summary: 'Видалення посту' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req: ExpressRequest, @Param('id') id: number) {
    const user = req.user;
    if (!user) {
      throw new Error('User not authenticated');
    }


    return this.postService.remove(user, id);
  }
}
