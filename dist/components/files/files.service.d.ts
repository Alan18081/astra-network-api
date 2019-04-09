/// <reference types="node" />
import { File } from './file.interface';
import { FilesRepository } from './files.repository';
import { Upload } from './interfaces/upload.interface';
import ReadableStream = NodeJS.ReadableStream;
import { ConfigService } from "../core/services/config.service";
export declare class FilesService {
    private readonly filesRepository;
    private readonly configService;
    private readonly cloudinary;
    constructor(filesRepository: FilesRepository, configService: ConfigService);
    findOne(id: string): Promise<File | null>;
    saveFile(filename: string, stream: ReadableStream): Promise<string>;
    uploadFile(file: Upload, userId: string): Promise<File>;
    uploadFilesList(files: Upload[], userId: string): Promise<File[]>;
    deleteOne(id: string): Promise<void>;
}
