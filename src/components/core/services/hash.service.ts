import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

  private readonly SALT_ROUNDS: number = 10;

  generateHash(str: string): Promise<string> {
    return bcrypt.hash(str, this.SALT_ROUNDS);
  }

  compareHash(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }

}