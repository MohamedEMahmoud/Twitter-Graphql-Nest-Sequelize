import { CreateTweetInput } from './create-tweet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateTweetInput extends PartialType(CreateTweetInput) {

  @Field(() => Int)
  id: number;

  @IsString()
  @Field(() => String, { nullable: true })
  content: string;

  @IsString()
  @Field(() => String, { nullable: true })
  image_url: string;
}
