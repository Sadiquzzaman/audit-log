import { Injectable } from '@nestjs/common';
import { UserReponseDto } from 'src/user/dto/user-response.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthUserDto } from './dto/local-auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(registerUserDto: RegisterUserDto) {
    await this.userService.create(registerUserDto);
  }

  async validateLocalStrategyUser(
    localUser: LocalAuthUserDto,
  ): Promise<UserReponseDto> {
    return await this.userService.validateUserEmailPass(localUser);
  }
}
