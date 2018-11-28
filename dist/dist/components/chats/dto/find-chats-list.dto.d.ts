import { PaginationDto } from '../../core/dto/pagination.dto';
export declare class FindChatsListDto extends PaginationDto {
    ids: number[];
    includeMessages?: boolean;
    includeUsers?: boolean;
    userId?: boolean;
}
