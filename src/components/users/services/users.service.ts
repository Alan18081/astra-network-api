import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseService} from '../../../helpers/interfaces/base-service.interface';
import {User} from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto} from '../dto/create-user.dto';
import {HashService} from '../../core/services/hash.service';
import {FindUsersListDto} from '../dto/find-users-list.dto';
import {Roles} from '../../../helpers/enums/roles.enum';
import {Messages} from '../../../helpers/enums/messages.enum';
import {GoogleUserData} from '../interfaces/google-user-data.interface';

@Injectable()
export class UsersService implements BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async findMany(payload: FindUsersListDto): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('user');

    if (payload.ageFrom) {
      query.where('age > :ageFrom', { ageFrom: payload.ageFrom});
    }

    if (payload.ageTo) {
      query.where('age < :ageTo', { ageTo: payload.ageTo });
    }

    if (payload.onlySellers) {
      query.where('roleId = :roleId', { roleId: Roles.BUYER });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<User | undefined> {
    const user =  await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByEmail(email: string, includePassword: boolean = false): Promise<User | undefined> {
    const query = this.usersRepository.createQueryBuilder('user')
      .where('email = :email', { email });

    if (includePassword) {
      query.addSelect('user.password');
    }

    return await query.getOne();
  }

  async findOneByGoogleId(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ googleId: id });
  }

  async create(payload: CreateUserDto): Promise<User | undefined> {
    const passwordHash = await this.hashService.generateHash(payload.password);

    const newUser = {
      ...new User(),
      ...payload,
      password: passwordHash,
    };

    await this.usersRepository.save(newUser);

    return this.usersRepository.findOne(newUser.id);
  }

  async createByGoogle(payload: GoogleUserData): Promise<User | undefined> {
    const newUser = {
      ...new User(),
      ...payload,
    };

    return await this.usersRepository.save(newUser);
  }

  async update(id: number, payload: Partial<User>): Promise<User | undefined> {
    await this.usersRepository.update(
      { id },
      payload,
    );

    return await this.usersRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}