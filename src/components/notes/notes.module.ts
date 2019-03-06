import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import {NotesGateway} from './notes.gateway';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    CoreModule,
    AuthModule,
  ],
  exports: [],
  controllers: [NotesController],
  providers: [NotesGateway, NotesService],
})
export class NotesModule {}