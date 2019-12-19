import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      const match = await this.compare(pass, user.hash);

      if (match) {
        const { hash, ...result } = user;
        return result;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      this.logger.error(`Error validating user`, error);
      return null;
    }
  }

  async validateUserTokenPayload(payload: any): Promise<boolean> {
    try {
      const user = await this.usersService.findOne(payload.username);
      return Promise.resolve(Boolean(user));
    } catch (error) {
      this.logger.error(`Error validating user`, error);
      throw new NotFoundException();
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async compare(pwd: string, hash: string) {
    return bcrypt.compare(pwd, hash);
  }
}
