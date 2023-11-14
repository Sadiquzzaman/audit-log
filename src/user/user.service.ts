import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthUserDto } from 'src/auth/dto/local-auth-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { ActiveStatusEnum } from 'src/common/enums/active.enum';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { UserReponseDto } from './dto/user-response.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypto: CryptoUtil,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const isEmailDuplicate = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });

    if (isEmailDuplicate) {
      throw new BadRequestException('Email already exist!');
    }

    registerUserDto.password = await this.crypto.hashPassword(
      registerUserDto.password,
    );

    const userEntity = {
      ...registerUserDto,
      status: ActiveStatusEnum.ACTIVE,
    };

    const user = await this.userRepository.save(userEntity);
    delete user.password;
    return user;
  }

  async validateUserEmailPass(
    localUser: LocalAuthUserDto,
  ): Promise<UserReponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: localUser.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (
      !(await this.crypto.comparePassword(localUser.password, user.password))
    ) {
      throw new UnauthorizedException('Login credentials not accepted');
    }

    delete user.password;

    //generate token
    const access_token = this.generateJwtToken(user);

    return { ...user, access_token };
  }

  private generateJwtToken(user: UserEntity): string {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: 'thisisasecret',
      expiresIn: '30m',
    });

    return token;
  }
}
