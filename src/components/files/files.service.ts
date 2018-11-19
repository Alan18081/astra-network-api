import * as cloudinary from 'cloudinary';
import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} from '../../config/index';
import { promisify } from 'util';

cloudinary.v2.uploader.upload = promisify(cloudinary.v2.uploader.upload);

export class FilesService {

  private readonly cloudinary = cloudinary;

  constructor() {
    this.cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: File): Promise<string> {
    const { url } = await this.cloudinary.v2.uploader.upload(file.path);
    console.log(url);
    return url;
  }

}