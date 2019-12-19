import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  logger = new Logger('WsJwtGuatd');
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();

    const authToken = client.handshake.query.auth_token;
    const jwtPayload = jwt.verify(authToken, process.env.SW_JWT_SECRET);
    this.logger.log(jwtPayload);
    const authorized: boolean = await this.authService.validateUserTokenPayload(
      jwtPayload,
    );
    return authorized;
  }
}
