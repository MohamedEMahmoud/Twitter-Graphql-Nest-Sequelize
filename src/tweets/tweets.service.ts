import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';
import { RemoveResponse } from 'src/user/dto/remove-response';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {

  constructor(
    @Inject('TWEET_REPOSITORY') private readonly tweetRepo: typeof Tweet,
    private readonly likesService: LikesService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) { }

  create(createTweetInput: CreateTweetInput, user: User): Promise<Tweet> {
    return this.tweetRepo.create({ ...createTweetInput, userId: user.id });
  }

  findAll(): Promise<Tweet[]> {
    return this.tweetRepo.findAll();
  }

  findAllTweetsByUser(id: number): Promise<Tweet[]> {
    return this.tweetRepo.findAll({ where: { userId: id } });
  }

  async findOne(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepo.findOne({ where: { id } });
    if (!tweet) {
      throw new NotFoundException('tweet not found');
    }
    return tweet;
  }

  async update(id: number, updateTweetInput: UpdateTweetInput): Promise<Tweet> {
    const existingTweet = await this.findOne(id);
    const [, tweet] = await this.tweetRepo.update({ ...updateTweetInput }, {
      where: { id: existingTweet.id },
      returning: true,
    });
    return tweet[0].dataValues;
  }

  async remove(id: number): Promise<RemoveResponse> {
    const existingTweet = await this.findOne(id);
    await this.tweetRepo.destroy({ where: { id: existingTweet.id } });
    return { statusCode: 204, success: true, message: "user deleted successfully" };
  }

  async findAllLikesByTweet(tweetId: number): Promise<Like[]> {
    return this.likesService.findAllLikesByTweet(tweetId);
  }

  async findUserMakeTweet(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
