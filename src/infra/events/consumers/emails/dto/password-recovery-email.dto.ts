import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordRecoveryEmailDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  reset_token: string;
}
