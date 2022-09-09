import { AuthService } from './auth.service';
import { AuthCredentialsDDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
