import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
