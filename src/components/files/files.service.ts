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
import {NotFoundException} from '@nestjs/common';
import {Messages} from '../../helpers/enums/messages.enum';

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

  async findOne(id: number): Promise<File | undefined> {
    return await this.filesRepository.findOne(id);
  }

  async uploadFile(file: any): Promise<File> {
    const { url, public_id } = await this.cloudinary.v2.uploader.upload(join(FILES_UPLOAD_FOLDER, file.filename));
    const newFile = {
      ...new File(),
      url,
      publicId: public_id,
    };

    return await this.filesRepository.save(newFile);
  }

  async uploadFilesList(files: any[]): Promise<File[]> {
    const uploadedFiles = await Promise.all(
      files.map(file => this.cloudinary.v2.uploader.upload(join(FILES_UPLOAD_FOLDER, file.filename))),
    );

    return await this.filesRepository.save(uploadedFiles.map(({ url, public_id }) => {
      return {
        ...new File(),
        url,
        publicId: public_id,
      };
    }));
  }

  async deleteOne(id: number): Promise<void> {
    const file = await this.filesRepository.findOne(id);
    if (!file) {
      throw new NotFoundException(Messages.FILE_NOT_FOUND);
    }

    await this.cloudinary.v2.uploader.destroy(file.publicId);

    await this.filesRepository.delete({ id });
  }

}