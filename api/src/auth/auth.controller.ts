import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: any, @Res() response: any){
    const { email, password } = body;
    const { status, message } = await this.authService.signUp(email, password);
    return response.status(status).send({ message });
  }

  @Post('signin')
  async signIn(@Body() body: any, @Res() response: any){
    const { email, password } = body;
    const { status, message } = await this.authService.signIn(email, password);
    return response.status(status).send({ message });
  }
}
