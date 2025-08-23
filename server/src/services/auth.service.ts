import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { SignupDto } from '../dtos/signup.dto';
import { InvolveAsiaAuthService } from './involve-asia-auth.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly involveAsiaAuthService: InvolveAsiaAuthService,
  ) {}

  // Register a new user by hashing the password and saving to the database.
  async signup(signupData: SignupDto) {
    const existingUser = await this.usersRepository.findOneBy({ username: signupData.username });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = await bcrypt.hash(signupData.password, 10);
    // const newUser = this.usersRepository.create({ username: signupData.username, passwordHash });
    const newUser = this.usersRepository.create({
      username: signupData.username,
      passwordHash,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
    });

    await this.usersRepository.save(newUser);

    const payload = { userId: newUser.id };
    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT secret is not configured.');
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return { token };
  }

  // Authenticate an existing user by fetching from the database and comparing passwords.
  async login(username: string, passwordPlain: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id };
    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      throw new InternalServerErrorException('JWT secret is not configured.');
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return { token };
  }

  // New method to get the Involve Asia API token
  async getInvolveAsiaToken() {
    return this.involveAsiaAuthService.authenticate();
  }
}