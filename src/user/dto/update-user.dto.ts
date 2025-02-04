import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'newuser@example.com',
    description: 'Новий email користувача',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'Новий пароль користувача',
  })
  password?: string;
}
