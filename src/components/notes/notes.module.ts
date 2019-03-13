import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.schema';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import {NotesGateway} from './notes.gateway';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';
import { NotesResolver } from './notes.resolver';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}]),
    CoreModule,
    AuthModule,
  ],
  exports: [],
  controllers: [NotesController],
  providers: [NotesGateway, NotesService, NotesResolver, NotesRepository],
})
export class NotesModule {}