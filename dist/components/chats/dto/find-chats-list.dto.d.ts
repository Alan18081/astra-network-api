import { PaginationDto } from '../../core/dto/pagination.dto';
export declare class FindChatsListDto extends PaginationDto {
    ids?: string[];
    includeMessages?: boolean;
    includeUsers?: boolean;
    userId: string;
}
