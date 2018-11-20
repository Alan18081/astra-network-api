import * as cloudinary from 'cloudinary';
import { join } from 'path';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  FILES_UPLOAD_FOLDER,
} from '../../config';
import { promisify } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {File} from './file.entity';

cloudinary.v2.uploader.upload = promisify(cloudinary.v2.uploader.upload);

export class FilesService {

  private readonly cloudinary = cloudinary;

  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
  ) {
    this.cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: any): Promise<File> {
    const { url } = await this.cloudinary.v2.uploader.upload(join(FILES_UPLOAD_FOLDER, file.filename));

    const newFile = {
      ...new File(),
      url,
    };

    return newFile;
  }

  async uploadFilesList(files: any[]): Promise<File[]> {
    const uploadedFiles = await Promise.all(
      files.map(file => this.cloudinary.v2.uploader.upload(join(FILES_UPLOAD_FOLDER, file.filename))),
    );

    return uploadedFiles.map(({ url }) => {
      return {
        ...new File(),
        url,
      };
    });
  }

}