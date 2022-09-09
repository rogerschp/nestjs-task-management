import { AuthCredentialsDDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        // duplicate username
        throw new HttpException('username already exists', HttpStatus.CONFLICT);
      } else {
        throw new InternalServerErrorException();
      }
    }
    throw new HttpException('User created successfuly', HttpStatus.CREATED);
  }
}
