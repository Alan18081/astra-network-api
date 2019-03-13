import { Module, MulterModule } from '@nestjs/common';
import {FilesService} from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './file.schema';
import { FilesResolver } from './files.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  exports: [FilesService, MulterModule],
  controllers: [FilesController],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}