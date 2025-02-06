import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../decorator/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Авторизація користувача' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Розлогування користувача' })
  @Post('logout')
  async logout(@Request() req: ExpressRequest) {
    return { message: 'Successfully logged out' };
  }
}
