import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
