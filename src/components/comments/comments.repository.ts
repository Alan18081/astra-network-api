import {BaseRepository} from '../core/base.repository';
import {Comment} from './comment.interface';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CommentsRepository extends BaseRepository<Comment> {



}