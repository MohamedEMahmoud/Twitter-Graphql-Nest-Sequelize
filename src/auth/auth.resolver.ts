import { User } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthGuard } from './guards/auth-guard';
import { UseGuards } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { AuthResponseType } from './dto/auth-response.type';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) { };

    @Query(() => User)
    @UseGuards(AuthGuard)
    currentUser(@Context('user') user: User):Promise<User> {
        return this.authService.currentUser(user.id);
    }

    @Mutation(() => AuthResponseType)
    async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponseType> {
        return await this.authService.login(loginInput);
    }

    @Mutation(() => AuthResponseType)
    async signup(@Args('registerInput') registerInput: RegisterInput): Promise<AuthResponseType> {
        return await this.authService.register(registerInput);
    }
}
