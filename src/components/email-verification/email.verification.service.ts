import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EmailVerification} from './email-verification.entity';
import {Repository} from 'typeorm';
import {HashService} from '../core/services/hash.service';

@Injectable()
export class EmailVerificationService {

  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationsRepository: Repository<EmailVerification>,
    private readonly hashService: HashService,
  ) {}

  async createOne(userId: number, email: string): Promise<void> {
    const hash = await this.hashService.generateHash(JSON.stringify({ userId, email }));
    const emailVerificationRecord = new EmailVerification();
    emailVerificationRecord.userId = userId;
    emailVerificationRecord.hash = hash;

    await this.emailVerificationsRepository.save(emailVerificationRecord);
  }

  async findByHash(hash: string): Promise<EmailVerification | undefined> {
    return await this.emailVerificationsRepository.findOne({ hash });
  }

}