import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // A simple method to get a user by their ID
  async findOneById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  // Method to update a user's profile
  async updateUser(userId: number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Update the fields if they are provided in the request body
    if (updateData.firstName) {
      user.firstName = updateData.firstName;
    }
    if (updateData.lastName) {
      user.lastName = updateData.lastName;
    }

    // Save the updated user to the database
    return this.usersRepository.save(user);
  }
}