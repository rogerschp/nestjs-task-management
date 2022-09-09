import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MinLength(32)
  password: string;
}
