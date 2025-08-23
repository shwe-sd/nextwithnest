import { Controller, Get, UseGuards, Req, Put, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import type { Request } from 'express';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = (req as any).user;
    return this.usersService.findOneById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
    const user = (req as any).user;
    return this.usersService.updateUser(user.userId, body);
  }
}