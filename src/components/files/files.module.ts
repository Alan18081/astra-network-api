import { Module, MulterModule } from '@nestjs/common';
import {FilesService} from './files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './file.schema';
import { FilesRepository } from './files.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  exports: [FilesService, MulterModule],
  providers: [FilesService, FilesRepository],
})
export class FilesModule {}