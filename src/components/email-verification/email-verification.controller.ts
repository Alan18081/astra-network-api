import {Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {VerifyEmailDto} from './dto/verify-email.dto';
import {User} from '../users/user.entity';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {EmailVerificationService} from './email.verification.service';
import {EmailSendingService} from '../core/services/email-sending.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {UsersService} from '../users/services/users.service';

@Controller('verifyEmail')
@ApiUseTags('Verification of email')
export class EmailVerificationController {

  constructor(
    private readonly emailVerificationService: EmailVerificationService,
    private readonly emailSendingService: EmailSendingService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ title: 'Send verification email' })
  async verifyEmail(@Body() body: VerifyEmailDto, @ReqUser() user: User): Promise<void> {
    const { email } = body;
    // await this.emailSendingService.sendEmail();
    await this.emailVerificationService.createOne(user.id, email);
  }

  @Get('hash/:hash')
  @HttpCode(200)
  @ApiOperation({ title: 'Verify email hash' })
  async verifyHash(@Param('hash') hash: string): Promise<void> {
    const emailVerificationRecord = await this.emailVerificationService.findByHash(hash);

    if (!emailVerificationRecord) {
      throw new NotFoundException(Messages.EMAIL_VERIFICATION_HASH_NOT_FOUND);
    }

    await this.usersService.updateOne(emailVerificationRecord.userId, { emailVerified: true });
  }

}