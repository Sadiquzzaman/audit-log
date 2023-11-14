import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { UserEntity } from './entities/user.entity/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserRepository,
    CryptoUtil,
    JwtService,
    ConfigService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
