import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveResponse {
    @Field(() => Int)
    statusCode: number;

    @Field(() => String)
    message: string;

    @Field(() => Boolean)
    success: boolean;
}