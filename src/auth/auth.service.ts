import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from 'src/dto/auth.dto';

export const fakeUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
  },
  {
    id: 2,
    username: 'user',
    password: 'password',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  validateUser({ password, username }: AuthPayloadDto) {
    const user = fakeUsers.find((u) => u.username === username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (password === user.password) {
      const { password, ...packed } = user;
      return this.jwtService.sign(packed);
    }
  }
}
