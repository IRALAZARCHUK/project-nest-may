import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'Оновлений текст посту', description: 'Оновлений текст' })
  text?: string;
}
