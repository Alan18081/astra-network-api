import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';
import { EmailSendingService } from './services/email-sending.service';
import { EmailTemplatesService } from './services/email-templates.service';
import { SocketEmitterService } from './services/socket-emitter.service';

const exportedProviders = [
  HashService,
  EmailSendingService,
  EmailTemplatesService,
  SocketEmitterService,
];

@Module({
  imports: [],
  exports: [...exportedProviders],
  controllers: [],
  providers: [...exportedProviders],
})
export class CoreModule {}