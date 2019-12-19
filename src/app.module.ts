import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { SocketClientFactory } from './utils/socket-client-factory/socket-client.factory';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [SocketClientFactory],
})
export class AppModule {}
