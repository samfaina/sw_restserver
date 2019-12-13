import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [EventsModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
