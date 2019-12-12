import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';

export type User = any;

@Injectable()
export class UsersService {
  private client: ClientProxy;

  // TODO persistence layer
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8876,
      },
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.client.send<User, string>('findUser', username).toPromise();
  }
}
