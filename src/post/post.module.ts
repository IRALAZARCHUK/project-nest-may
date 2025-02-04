import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Імпортуємо JwtModule для доступу до JwtService

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,  // AuthModule вже імпортує JwtModule, але додатково можна також імпортувати JwtModule
    JwtModule,  // Додаємо JwtModule в PostModule
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
