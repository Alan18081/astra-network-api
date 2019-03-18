import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
import { NotesService } from './notes.service';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}]),
    CoreModule,
    AuthModule,
  ],
  exports: [NotesService],
  providers: [
      NotesService,
      NotesRepository
  ],
})
export class NotesModule {}