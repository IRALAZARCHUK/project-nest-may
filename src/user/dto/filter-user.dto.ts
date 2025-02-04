import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiPropertyOptional({ example: 1, description: 'ID користувача' })
  id?: number;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Email користувача для пошуку',
  })
  email?: string;
}
