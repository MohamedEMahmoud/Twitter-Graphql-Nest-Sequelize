import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateFollowerInput {

  @Field(() => Int)
  followerId: number;

}
