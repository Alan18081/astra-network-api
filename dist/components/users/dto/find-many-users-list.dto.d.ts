import { PaginationDto } from '../../core/dto/pagination.dto';
import { Gender } from '../../../helpers/enums/gender.enum';
export declare class FindManyUsersListDto extends PaginationDto {
    ageFrom?: number;
    ageTo?: number;
    gender?: Gender;
    query?: string;
}
