import { Module, MulterModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilesService} from './files.service';
import { File } from './file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  exports: [FilesService, MulterModule],
  controllers: [],
  providers: [FilesService],
})
export class FilesModule {}