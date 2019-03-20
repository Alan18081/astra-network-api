import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';
import { DateScalar } from './scalars/date.scalar';
import { PublisherService } from './services/publisher.service';
import { PhoneVerificationService } from './services/phone-verification.service';
import { ConfigService } from './services/config.service';

const exportedProviders = [
  HashService,
  DateScalar,
  PublisherService,
  PhoneVerificationService,
  {
    provide: ConfigService,
    useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
  },
];

@Module({
  imports: [],
  exports: [...exportedProviders],
  controllers: [],
  providers: [...exportedProviders],
})
export class CoreModule {}