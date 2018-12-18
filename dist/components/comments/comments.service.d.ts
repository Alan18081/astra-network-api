import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsService {
    private readonly commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    createOne(payload: CreateCommentDto, user: User): Promise<Comment>;
    updateOne(id: number, payload: UpdateCommentDto): Promise<Comment | undefined>;
    deleteOne(id: number): Promise<void>;
}
