import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/common/decorators/user-payload.decorator';
import { AuthService } from './auth.service';
import { LocalAuthUserDto } from './dto/local-auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const payload = await this.authService.signUp(registerUserDto);
    return { message: 'Registered successfully!', payload };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() localUser: LocalAuthUserDto) {
    const payload = await this.authService.validateLocalStrategyUser(localUser);
    return { message: 'Loged in successful!', payload };
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('verify-auth-guard')
  async test(@UserPayload() jwtPayload: JwtPayloadInterface) {
    return { payload: jwtPayload };
  }
}
