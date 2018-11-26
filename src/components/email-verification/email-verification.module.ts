import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmailVerification} from './email-verification.entity';
import {EmailVerificationService} from './email.verification.service';
import {EmailVerificationController} from './email-verification.controller';
import {CoreModule} from '../core/core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerification]),
    CoreModule,
  ],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}