import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emblem } from 'src/entities/emblem.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmblemService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Emblem)
    private emblemsRepository: Repository<Emblem>,
  ) {}
  async getUserEmblems(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['emblems'],
    });

    return user.emblems;
  }

  async unlockRandomEmblem(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['emblems'],
    });

    if (!user) {
      return 'User not found';
    }

    let queryBuilder = this.emblemsRepository.createQueryBuilder('emblem');

    if (user.emblems.length > 0) {
      const emblemIds = user.emblems.map((emblem) => emblem.id);
      queryBuilder = queryBuilder.where('emblem.id NOT IN (:...emblemIds)', {
        emblemIds,
      });
    }

    const randomEmblem = await queryBuilder.orderBy('RAND()').getOne();

    if (!randomEmblem) {
      return 'No emblems left to unlock';
    }

    user.emblems.push(randomEmblem);

    await this.usersRepository.save(user);

    return randomEmblem;
  }
}
