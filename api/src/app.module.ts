import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Emblem } from './entities/emblem.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FeatureModule } from './feature/feature.module';
import { EmblemModule } from './emblem/emblem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'db',
      username: 'user',
      password: 'password',
      host: 'db',
      port: 3306,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Emblem]),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FeatureModule,
    EmblemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
