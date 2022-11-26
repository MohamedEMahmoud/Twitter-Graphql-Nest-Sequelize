import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsAlpha, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @IsAlpha()
  @Field(() => String, { nullable: true })
  username: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @IsString()
  @Field(() => String, { nullable: true })
  password: string;

  @IsString()
  @Field(() => String, { nullable: true })
  avatar: string;
}
