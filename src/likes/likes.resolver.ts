import { Resolver, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { User } from 'src/user/entities/user.entity';


@Resolver(() => Like)
@UseGuards(AuthGuard)
export class LikesResolver {

  constructor(private readonly likesService: LikesService) { }

  @Mutation(() => Like, { name: 'createLikeOrRemove' })
  createLikeOrRemove(@Args('createLikeInput') createLikeInput: CreateLikeInput, @Context('user') user: User): Promise<number | Like> {
    return this.likesService.create(createLikeInput, user);
  }

  @ResolveField(() => [User])
  async user(@Parent() like: Like): Promise<User> {
    return await this.likesService.getUser(like.userId);
  }

}
