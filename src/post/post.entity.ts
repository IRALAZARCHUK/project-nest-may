import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @ApiProperty({ example: 1, description: 'Унікальний ідентифікатор поста' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Це мій перший пост!', description: 'Текст поста' })
  @Column()
  text: string;

  @ApiProperty({ example: '2024-02-04T12:00:00.000Z', description: 'Дата створення' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: 1, description: 'ID користувача, якому належить пост' })
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
