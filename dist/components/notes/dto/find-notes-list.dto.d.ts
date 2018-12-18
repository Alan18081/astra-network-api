import { PaginationDto } from '../../core/dto/pagination.dto';
export declare class FindNotesListDto extends PaginationDto {
    ids: number[];
    includeFiles?: boolean;
    userId?: boolean;
}
