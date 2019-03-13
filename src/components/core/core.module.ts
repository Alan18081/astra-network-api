import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';
import { EmailSendingService } from './services/email-sending.service';
import { EmailTemplatesService } from './services/email-templates.service';
import {ClientsStoreService} from './services/clients-store.service';
import { DateScalar } from './scalars/date.scalar';

const exportedProviders = [
  HashService,
  EmailSendingService,
  EmailTemplatesService,
  ClientsStoreService,
  DateScalar
];

@Module({
  imports: [],
  exports: [...exportedProviders],
  controllers: [],
  providers: [...exportedProviders],
})
export class CoreModule {}