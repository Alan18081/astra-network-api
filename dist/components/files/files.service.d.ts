import { File } from './file.interface';
import { FilesRepository } from './files.repository';
export declare class FilesService {
    private readonly filesRepository;
    private readonly cloudinary;
    constructor(filesRepository: FilesRepository);
    findOne(id: string): Promise<File | null>;
    uploadFile(file: any): Promise<File>;
    uploadFilesList(files: any[]): Promise<File[]>;
    deleteOne(id: string): Promise<void>;
}
