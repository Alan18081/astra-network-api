import { File } from './file.entity';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: any): Promise<File>;
    uploadFilesList(files: any[]): Promise<File[]>;
}
