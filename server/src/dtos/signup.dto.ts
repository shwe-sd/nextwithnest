import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters.' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username can only contain letters, numbers, hyphens, and underscores.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30, { message: 'Password must be between 8 and 30 characters.' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters.' })
  firstName: string;

  @IsString()
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters.' })
  lastName: string;
}