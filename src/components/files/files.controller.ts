import {
  Controller,
  FileInterceptor,
  FilesInterceptor,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {File} from './file.entity';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { FilesService } from './files.service';

@Controller('files')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('Files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ title: 'Upload one file' })
  async uploadFile(@UploadedFile() file: any): Promise<File> {
    return await this.filesService.uploadFile(file);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ title: 'Upload one file' })
  async uploadFilesList(@UploadedFile() files: any[]): Promise<File[]> {
    return await this.filesService.uploadFilesList(files);
  }

}