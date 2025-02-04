import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Це мій перший пост!', description: 'Текст посту' })
  text: string;
}
