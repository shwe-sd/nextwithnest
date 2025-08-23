import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters.' })
  @Matches(/^[a-zA-Z -]+$/, {
    message: 'First name can only contain letters, spaces, and hyphens.',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters.' })
  @Matches(/^[a-zA-Z -]+$/, {
    message: 'Last name can only contain letters, spaces, and hyphens.',
  })
  lastName?: string;
}