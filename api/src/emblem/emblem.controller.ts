import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmblemService } from './emblem.service';
import { CurrentUserDto } from 'src/auth/current-user.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('emblem')
export class EmblemController {
  constructor(private readonly emblemService: EmblemService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserEmblems(@CurrentUser() user: CurrentUserDto) {
    return this.emblemService.getUserEmblems(user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  unlockRandomEmblem(@CurrentUser() user: CurrentUserDto) {
    return this.emblemService.unlockRandomEmblem(user.userId);
  }
}
