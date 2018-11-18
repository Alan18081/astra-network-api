import {Module} from '@nestjs/common';
import {HashService} from './services/hash.service';

@Module({
  imports: [],
  exports: [HashService],
  controllers: [],
  providers: [HashService],
})
export class CoreModule {}