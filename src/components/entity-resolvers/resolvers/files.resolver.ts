import {Resolver, Mutation, Args, ResolveProperty, Parent} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { File } from '../../files/file.interface';
import { FilesService } from '../../files/files.service';
import {Upload} from '../../files/interfaces/upload.interface';
import {GqlAuthGuard} from '../../../helpers/guards/auth.guard';
import {User} from '../../users/user.interface';
import {UsersService} from '../../users/users.service';
import {ReqUser} from '../../../helpers/decorators/user.decorator';

@Resolver('File')
export class FilesResolver {

  constructor(
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveProperty('user')
  async user(@Parent() file: File): Promise<User | null> {
    return this.usersService.findOne(file.user);
  }

  @Mutation('uploadFile')
  @UseGuards(GqlAuthGuard)
  async uploadFile(@ReqUser() user: User, @Args('file') someFile: Upload): Promise<File> {
    return this.filesService.uploadFile(someFile, user._id);
  }

  @Mutation('uploadFilesList')
  @UseGuards(GqlAuthGuard)
  async uploadFilesList(@ReqUser() user: User, @Args('files') files: Upload[]): Promise<File[]> {
    return this.filesService.uploadFilesList(files, user._id);
  }
}
