import { LoginInput } from './dto/login.input';
import { Inject, Injectable, NotFoundException, BadRequestException, forwardRef } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { AuthResponseType } from './dto/auth-response.type';

@Injectable()
export class AuthService {

    constructor(@Inject('USER_REPOSITORY') private readonly userRepo: typeof User) { }

    createToken(id: number): string {
        return jwt.sign({ id }, 'secret');
    }

    async login(loginInput: LoginInput): Promise<AuthResponseType> {
        const user = await this.userRepo.findOne({ where: { email: loginInput.email }, raw: true });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(loginInput.password, user.password);

        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        return {
            user,
            access_token: this.createToken(user.id)
        };
    }

    async register(signupInput: RegisterInput): Promise<AuthResponseType> {
        const existingUser = await this.userRepo.findOne({ attributes: ["email"], where: { email: signupInput.email } });

        if (existingUser)
            throw new BadRequestException('User is already registered');

        const hashedPassword = await this.hashedPassword(signupInput.password);

        const user = await this.userRepo.create({
            ...signupInput,
            password: hashedPassword
        });

        return {
            user: user.toJSON(),
            access_token: this.createToken(user.id)
        };
    }

    currentUser(id: number): Promise<User> {
        return this.userRepo.findOne({ where: { id }, raw: true });
    }

    async hashedPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
