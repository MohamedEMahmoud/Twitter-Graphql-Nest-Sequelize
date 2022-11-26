import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { User } from 'src/user/entities/user.entity';
import { RemoveResponse } from 'src/user/dto/remove-response';
import { Like } from 'src/likes/entities/like.entity';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) { }

  @Mutation(() => Tweet, { name: 'CreateTweet' })
  @UseGuards(AuthGuard)
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput, @Context('user') user: User): Promise<Tweet> {
    return this.tweetsService.create(createTweetInput, user);
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findAll(): Promise<Tweet[]> {
    return this.tweetsService.findAll();
  }

  @Query(() => Tweet, { name: 'tweet' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Tweet> {
    return this.tweetsService.findOne(id);
  }

  @Mutation(() => Tweet, { name: 'UpdateTweet' })
  @UseGuards(AuthGuard)
  updateTweet(@Args('updateTweetInput') updateTweetInput: UpdateTweetInput): Promise<Tweet> {
    return this.tweetsService.update(updateTweetInput.id, updateTweetInput);
  }

  @Mutation(() => RemoveResponse, { name: 'DeleteTweet' })
  @UseGuards(AuthGuard)
  removeTweet(@Args('id', { type: () => Int }) id: number): Promise<RemoveResponse> {
    return this.tweetsService.remove(id);
  }

  @ResolveField(() => User)
  async user(@Parent() tweet: Tweet): Promise<User> {
    return this.tweetsService.findUserMakeTweet(tweet.userId);
  }

  @ResolveField(() => [Like])
  async likes(@Parent() tweet: Tweet): Promise<Like[]> {
    return this.tweetsService.findAllLikesByTweet(tweet.id);
  }

}
