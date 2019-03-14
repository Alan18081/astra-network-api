import * as cloudinary from 'cloudinary';
import { join } from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  FILES_UPLOAD_FOLDER,
} from '../../config';
import {NotFoundException} from '@nestjs/common';
import {Messages} from '../../helpers/enums/messages.enum';
import { File } from './file.interface';
import { FilesRepository } from './files.repository';

cloudinary.v2.uploader.upload = promisify(cloudinary.v2.uploader.upload);

const unlink = promisify(fs.unlink);

export class FilesService {

  private readonly cloudinary = cloudinary;

  constructor(
    private readonly filesRepository: FilesRepository,
  ) {
    this.cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async findOne(id: string): Promise<File | null> {
    return this.filesRepository.findById(id);
  }

  async uploadFile(file: any): Promise<File> {
    const path = join(FILES_UPLOAD_FOLDER, file.filename);
    const { url, public_id } = await this.cloudinary.v2.uploader.upload(path);
    await unlink(path);
    const newFile: Partial<File> = {
      url,
      publicId: public_id,
    };

    return this.filesRepository.save(newFile);
  }

  async uploadFilesList(files: any[]): Promise<File[]> {
    const uploadedFiles = await Promise.all(
      files.map(file => this.cloudinary.v2.uploader.upload(join(FILES_UPLOAD_FOLDER, file.filename))),
    );

    return Promise.all(
      uploadedFiles.map(({ url, public_id }) => this.filesRepository.save({ url, publicId: public_id }))
    );
  }

  async deleteOne(id: string): Promise<void> {
    const file = await this.filesRepository.findById(id);
    if (!file) {
      throw new NotFoundException(Messages.FILE_NOT_FOUND);
    }

    await this.cloudinary.v2.uploader.destroy(file.publicId);

    await this.filesRepository.deleteById(id);
  }

}