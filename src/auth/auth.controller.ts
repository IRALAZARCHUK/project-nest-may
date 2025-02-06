// auth.controller.ts
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express'; // Імпортуємо тип Request з Express
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../decorator/public.decorator'; // Якщо використовуєш публічний декоратор
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // Цей endpoint не потребує токена
  @ApiOperation({ summary: 'Авторизація користувача' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard) // Для logout потрібна авторизація
  @ApiOperation({ summary: 'Розлогування користувача' })
  @Post('logout')
  async logout(@Request() req: ExpressRequest) {
    // Оскільки JWT є безстанним, сервер не може "анулювати" токен.
    // Лише повертаємо повідомлення, щоб клієнт міг видалити токен із збереженого сховища.
    return { message: 'Successfully logged out' };
  }
}
