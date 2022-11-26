import { User } from 'src/user/entities/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';


@ObjectType()
export class AuthResponseType {

    @Field(() => User)
    user: User;

    @Field(() => String, { nullable: true })
    access_token: string;

}
