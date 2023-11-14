import { ObjectId } from 'mongodb';
import { LocalAuthUserDto } from 'src/auth/dto/local-auth-user.dto';

export class UserReponseDto extends LocalAuthUserDto {
  id: ObjectId;
  access_token: string;
}
