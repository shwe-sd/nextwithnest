import { Body, Controller, Post, Res, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData.username, loginData.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    // req.user was set in JwtAuthGuard after jwt.verify(...)
    return { ok: true, user: req.user };
  }
}