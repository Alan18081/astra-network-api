import { Module, MulterModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilesService} from './files.service';
import { File } from './file.entity';
import { FilesController } from './files.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  exports: [FilesService, MulterModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}