import { Injectable } from '@nestjs/common';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { HashService } from '../core/services/hash.service';
import { UserHashesRepository } from './user-hashes.repository';
import { UserHash } from './user-hash.interface';

@Injectable()
export class UserHashesService {

  constructor(
    private readonly userHashesRepository: UserHashesRepository,
    private readonly hashService: HashService,
  ) {}

  async findOneByHash(hash: string): Promise<UserHash | null> {
    return await this.userHashesRepository.findOneByHash(hash);
  }

  async createOne(userId: string, type: HashTypes): Promise<UserHash> {
    const userHash: Partial<UserHash> = {};
    userHash.hash = await this.hashService.generateHash(JSON.stringify({ userId, type }));
    userHash.userId = userId;

    return await this.userHashesRepository.save(userHash);
  }

  async deleteOne(id: string): Promise<void> {
    await this.userHashesRepository.deleteById(id);
  }

}