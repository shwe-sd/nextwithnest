import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConversionsController } from '../controllers/conversions.controller';
import { ConversionsService } from '../services/conversions.service';
import { InvolveAsiaAuthService } from '../services/involve-asia-auth.service';

@Module({
  imports: [HttpModule],
  controllers: [ConversionsController],
  providers: [ConversionsService, InvolveAsiaAuthService],
})
export class ConversionsModule {}