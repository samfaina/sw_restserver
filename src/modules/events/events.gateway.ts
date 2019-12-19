import { Logger, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Server } from 'socket.io';
import { WsJwtGuard } from './wsjwt.guard';

@WebSocketGateway(+process.env.SW_SOCKET_PORT)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  logger = new Logger('EventsGateway');

  private tokenSource = new BehaviorSubject<string>(null);
  token$ = this.tokenSource.asObservable();

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('register')
  async connect(@MessageBody() data: string): Promise<string> {
    this.tokenSource.next(data);
    this.logger.log(data);
    return 'connected';
  }
}
