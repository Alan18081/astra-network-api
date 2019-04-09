import { File } from './file.interface';
import { FilesService } from './files.service';
export declare class FilesResolver {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: any): Promise<File>;
    uploadFilesList(files: any[]): Promise<File[]>;
}
