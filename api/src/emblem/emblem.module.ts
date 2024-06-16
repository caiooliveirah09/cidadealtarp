import { Module } from '@nestjs/common';
import { EmblemService } from './emblem.service';
import { EmblemController } from './emblem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Emblem } from 'src/entities/emblem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Emblem])],
  providers: [EmblemService],
  controllers: [EmblemController],
})
export class EmblemModule {}
