import * as cloudinary from 'cloudinary';
import { join } from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Messages} from '../../helpers/enums/messages.enum';
import { File } from './file.interface';
import { FilesRepository } from './files.repository';
import {Upload} from './interfaces/upload.interface';
import ReadableStream = NodeJS.ReadableStream;
import {createWriteStream} from 'fs';
import WritableStream = NodeJS.WritableStream;
import {ConfigService} from "../core/services/config.service";

cloudinary.v2.uploader.upload = promisify(cloudinary.v2.uploader.upload);

const unlink = promisify(fs.unlink);

@Injectable()
export class FilesService {

  private readonly cloudinary = cloudinary;

  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {
    this.cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async findOne(id: string): Promise<File | null> {
    return this.filesRepository.findById(id);
  }

  async saveFile(filename: string, stream: ReadableStream): Promise<string> {
      return new Promise((resolve, reject) => {
        const path = join(this.configService.getFilesFolder(), filename);
          const writeStream: WritableStream = createWriteStream(path);
          stream.pipe(writeStream);
          stream.on('end', () => {
              resolve(path);
          });

          stream.on('error', err => {
              reject(err);
          });
      });
  }

  async uploadFile(file: Upload, userId: string): Promise<File> {
    const path = await this.saveFile(file.filename, file.createReadStream());
    const { url, public_id } = await this.cloudinary.v2.uploader.upload(path);
    await unlink(path);
    const newFile: Partial<File> = {
      url,
      publicId: public_id,
      user: userId,
    };

    return this.filesRepository.save(newFile);
  }

  async uploadFilesList(files: Upload[], userId: string): Promise<File[]> {
    const uploadedFiles = await Promise.all(
      files.map(async file => {
          const path = await this.saveFile(file.filename, file.createReadStream());
          const { url, public_id } = await this.cloudinary.v2.uploader.upload(path);
          await unlink(path);
          return { url, public_id };
      }),
    );

    return Promise.all(
      uploadedFiles.map(({ url, public_id }) => this.filesRepository.save({
          url,
          publicId: public_id,
          user: userId,
      }))
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