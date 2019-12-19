import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { SocketClientFactory } from 'src/utils/socket-client-factory/socket-client.factory';

export type User = any;

@Injectable()
export class UsersService {
  private client: ClientProxy;

  constructor(private readonly socketFactory: SocketClientFactory) {
    this.client = ClientProxyFactory.create(
      this.socketFactory.createDBClient(),
    );
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.client.send<User, string>('findUser', username).toPromise();
  }
}
