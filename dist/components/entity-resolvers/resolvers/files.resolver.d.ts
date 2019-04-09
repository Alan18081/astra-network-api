import { File } from '../../files/file.interface';
import { FilesService } from '../../files/files.service';
import { Upload } from '../../files/interfaces/upload.interface';
import { User } from '../../users/user.interface';
import { UsersService } from '../../users/users.service';
export declare class FilesResolver {
    private readonly filesService;
    private readonly usersService;
    constructor(filesService: FilesService, usersService: UsersService);
    user(file: File): Promise<User | null>;
    uploadFile(user: User, someFile: Upload): Promise<File>;
    uploadFilesList(user: User, files: Upload[]): Promise<File[]>;
}
