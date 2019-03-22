import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './config';
import { CoreModule } from './components/core/core.module';
import { EntityResolversModule } from './components/entity-resolvers/entity-resolvers.module';
import { ConfigService } from './components/core/services/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({  uri: config.get('DB_URL'), useMongoClient: true }),
      inject: [ConfigService]
    }),
    EntityResolversModule,
    CoreModule,
  ],
})
export class AppModule {}
