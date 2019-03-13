import { Resolver, Mutation } from '@nestjs/graphql';
import { FileInterceptor, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { File } from './file.interface';
import { FilesService } from './files.service';
import { AuthGuard } from '@nestjs/passport';

@Resolver('File')
@UseGuards(AuthGuard('jwt'))
export class FilesResolver {

  constructor(
    private readonly filesService: FilesService
  ) {}

  @Mutation('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any): Promise<File> {
    return this.filesService.uploadFile(file);
  }

  @Mutation('uploadFilesList')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFilesList(@UploadedFile() files: any[]): Promise<File[]> {
    return this.filesService.uploadFilesList(files);
  }

}
