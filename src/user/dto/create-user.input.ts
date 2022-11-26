import { InputType, Field, HideField } from '@nestjs/graphql';
import { IsString, IsAlpha, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {

    @IsAlpha()
    @Field(() => String)
    username: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
    @Field()
    password: string;

    @IsString()
    @Field(() => String)
    avatar: string;
}
