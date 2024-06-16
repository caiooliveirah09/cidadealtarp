import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    email: string,
    password: string,
  ): Promise<{ status: HttpStatus; message: string | undefined }> {
    if (!this.isValidEmail(email)) {
      return { status: HttpStatus.BAD_REQUEST, message: 'Invalid email' };
    }

    if (!this.isValidPassword(password)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'The password must be at least 6 characters',
      };
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return { status: HttpStatus.BAD_REQUEST, message: 'Email in use' };
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString('hex')}`;

    const newUser = this.usersRepository.create({
      email,
      password: saltAndHash,
    });

    await this.usersRepository.save(newUser);

    return this.signIn(email, password);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ status: HttpStatus; message: string | undefined }> {
    if (!this.isValidEmail(email)) {
      return { status: HttpStatus.BAD_REQUEST, message: 'Invalid email' };
    }

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      };
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash != hash.toString('hex')) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      };
    }

    const payload = { email: user.email, sub: user.id };

    return {
      status: HttpStatus.OK,
      message: this.jwtService.sign(payload),
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 6;
  }
}
