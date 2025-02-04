import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post/post.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Унікальний ідентифікатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email користувача',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль користувача' })
  @Column()
  password?: string;

  @ApiProperty({ type: () => [Post], description: 'Список постів користувача' })
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
