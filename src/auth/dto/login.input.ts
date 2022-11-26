import { InputType, Field, HideField } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class LoginInput {

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field()
  password: string;
}
