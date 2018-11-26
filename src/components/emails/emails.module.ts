import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmailsService} from './emails.service';
import {TemplateGenerator} from './template-generator';

@Module({
  imports: [
    TypeOrmModule.forFeature(),
  ],
  providers: [
    EmailsService,
    TemplateGenerator,
  ],
  exports: [],
})
export class EmailsModule {}