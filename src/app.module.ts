import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules/schedules.controller';
import { SchedulesModule } from './schedules/schedules.module';
import { SchedulesService } from './schedules/schedules.service';

@Module({
  imports: [SchedulesModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class AppModule {}
