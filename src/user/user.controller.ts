import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Перегляд списку користувачів з фільтрацією' })
  @ApiBearerAuth() // Захищений ендпоінт (JWT Guard можна додати пізніше)
  @Get()
  async getAll(@Query() filterDto: FilterUserDto) {
    return this.userService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Пошук користувача за email' })
  @ApiBearerAuth()
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({
    summary: 'Оновлення даних користувача (тільки свого профілю)',
  })
  @ApiBearerAuth()
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Видалення користувача (тільки свого профілю)' })
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
