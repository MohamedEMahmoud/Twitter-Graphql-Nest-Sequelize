import { Resolver, Mutation, Args, Context, Parent, ResolveField } from '@nestjs/graphql';
import { FollowersService } from './followers.service';
import { Follower } from './entities/follower.entity';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Follower)
@UseGuards(AuthGuard)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) { }

  @Mutation(() => Follower)
  createFollowerOrRemove(@Args('createFollowerInput') createFollowerInput: CreateFollowerInput, @Context('user') user: User): Promise<number | Follower> {
    return this.followersService.create(createFollowerInput, user);
  }

  @ResolveField(() => [User])
  async user(@Parent() follower: Follower): Promise<User> {
    return await this.followersService.getFollower(follower.followerId);
  }

}
