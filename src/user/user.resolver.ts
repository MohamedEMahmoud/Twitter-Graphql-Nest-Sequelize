import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RemoveResponse } from './dto/remove-response';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Follower } from 'src/followers/entities/follower.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'UpdateUser' })
  @UseGuards(AuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Context('user') user: User): Promise<User> {
    return await this.userService.update(user.id, updateUserInput);
  }

  @Mutation(() => RemoveResponse, { name: 'DeleteUser' })
  @UseGuards(AuthGuard)
  async removeUser(@Context('user') user: User): Promise<RemoveResponse> {
    return await this.userService.remove(user.id);
  }

  @ResolveField(() => [Tweet])
  @UseGuards(AuthGuard)
  async tweets(@Parent() user: User): Promise<Tweet[]> {
    return this.userService.getAllTweets(user.id);
  }

  @ResolveField(() => [Follower])
  @UseGuards(AuthGuard)
  async followers(@Parent() user: User): Promise<Follower[]> {
    return await this.userService.getAllFollowers(user.id);
  }
}
