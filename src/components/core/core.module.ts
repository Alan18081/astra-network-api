import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';
import { EmailSendingService } from './services/email-sending.service';
import { EmailTemplatesService } from './services/email-templates.service';
import {ClientsStoreService} from './services/clients-store.service';
import { DateScalar } from './scalars/date.scalar';
import { PublisherService } from './services/publisher.service';
import { PhoneVerificationService } from './services/phone-verification.service';

const exportedProviders = [
  HashService,
  EmailSendingService,
  EmailTemplatesService,
  ClientsStoreService,
  DateScalar,
  PublisherService,
  PhoneVerificationService,
];

@Module({
  imports: [],
  exports: [...exportedProviders],
  controllers: [],
  providers: [...exportedProviders],
})
export class CoreModule {}