import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsAlpha } from 'class-validator';

@InputType()
export class RegisterInput {

    @IsAlpha()
    @Field(() => String)
    username: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
    @Field(() => String)
    password: string;

    @IsString()
    @Field(() => String)
    avatar: string;

}
