import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';
import { PubSub } from 'graphql-subscriptions';
import { EmailSendingService } from './services/email-sending.service';
import { EmailTemplatesService } from './services/email-templates.service';
import {ClientsStoreService} from './services/clients-store.service';
import { DateScalar } from './scalars/date.scalar';
import { PublisherService } from './services/publisher.service';
import { Providers } from '../../helpers/providers.enum';

const pubsubProvider = {
  provide: Providers.PUBLISHER_SERVICE,
  useValue: new PubSub()
};

const exportedProviders = [
  HashService,
  EmailSendingService,
  EmailTemplatesService,
  ClientsStoreService,
  DateScalar,
  PublisherService
];

@Module({
  imports: [],
  exports: [...exportedProviders],
  controllers: [],
  providers: [...exportedProviders],
})
export class CoreModule {}