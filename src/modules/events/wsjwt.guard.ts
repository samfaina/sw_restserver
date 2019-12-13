import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class WsJwtGuard implements CanActivate {
  logger = new Logger('WsJwtGuatd');
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    // const cookies: string[] = client.handshake.headers.cookie.split('; ');
    const authToken = client.handshake.query.auth_token;
    const jwtPayload = jwt.verify(authToken, jwtConstants.secret);
    this.logger.log(jwtPayload);
    const authorized: boolean = await this.authService.validateUserTokenPayload(
      jwtPayload,
    );
    // Bonus if you need to access your user after the guard
    // context.switchToWs().getData().user = user;
    // return Boolean(user);
    return authorized;
  }
}
