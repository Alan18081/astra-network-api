import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
import { NotesService } from './notes.service';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';
import { NotesResolver } from './resolvers/notes.resolver';
import { NotesRepository } from './notes.repository';
import {CommentsResolver} from './resolvers/comments.resolver';
import {AnswersResolver} from './resolvers/answers.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}]),
    CoreModule,
    AuthModule,
  ],
  exports: [],
  providers: [
      NotesService,
      NotesResolver,
      CommentsResolver,
      AnswersResolver,
      NotesRepository
  ],
})
export class NotesModule {}