import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { InvolveAsiaAuthService } from '../services/involve-asia-auth.service';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [AuthController],
  providers: [AuthService, InvolveAsiaAuthService],
  exports: [InvolveAsiaAuthService], // <-- This is the new line
})
export class AuthModule {}