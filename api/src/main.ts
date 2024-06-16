import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);
  const authService = app.get(AuthService);
  await appService.clearDatabase();
  await appService.seed(authService);

  app.enableCors();

  await app.listen(3001);
}
bootstrap();
