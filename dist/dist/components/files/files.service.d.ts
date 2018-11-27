import { Repository } from 'typeorm';
import { File } from './file.entity';
export declare class FilesService {
    private readonly filesRepository;
    private readonly cloudinary;
    constructor(filesRepository: Repository<File>);
    findOne(id: number): Promise<File | undefined>;
    uploadFile(file: any): Promise<File>;
    uploadFilesList(files: any[]): Promise<File[]>;
    deleteOne(id: number): Promise<void>;
}
