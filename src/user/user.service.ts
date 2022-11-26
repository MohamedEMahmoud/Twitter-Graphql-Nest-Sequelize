import { User } from './entities/user.entity';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../auth/auth.service';
import { RemoveResponse } from './dto/remove-response';
import { TweetsService } from 'src/tweets/tweets.service';
import { FollowersService } from 'src/followers/followers.service';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Follower } from 'src/followers/entities/follower.entity';


@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepo: typeof User,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    private readonly tweetService: TweetsService,
    private readonly followerService: FollowersService
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.findByEmail(createUserInput.email) || createUserInput;

    return this.userRepo.create({ ...user });
  }

  findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException(`User ${user.email} already registered`);
    }
    return null;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id }, raw: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.password) {
      updateUserInput.password = await this.authService.hashedPassword(updateUserInput.password);
    }

    const [, user] = await this.userRepo.update({ ...updateUserInput }, {
      where: { id },
      returning: true,
    });
    return user[0].dataValues;
  }

  async remove(id: number): Promise<RemoveResponse> {
    await this.userRepo.destroy({ where: { id } });
    return { statusCode: 204, success: true, message: "user deleted successfully" };
  }

  async getAllTweets(userId: number): Promise<Tweet[]> {
    return this.tweetService.findAllTweetsByUser(userId);
  }

  async getAllFollowers(userId: number): Promise<Follower[]> {
    return this.followerService.findAll(userId);
  }
}
