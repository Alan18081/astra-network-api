import { File } from '../../files/file.entity';
export interface ProductImages {
    mainImage: File;
    images?: File[];
}
