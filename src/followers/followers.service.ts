import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateFollowerInput } from './dto/create-follower.input';
import { Follower } from './entities/follower.entity';

@Injectable()
export class FollowersService {

  constructor(
    @Inject('FOLLOWER_REPOSITORY') private readonly followerRepo: typeof Follower,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) { };

  async create(createFollowerInput: CreateFollowerInput, user: User): Promise<number | Follower> {
    ;

    if (user.id === createFollowerInput.followerId) {
      throw new BadRequestException("can't follow yourself");
    }

    const follower = await this.findOne(user.id, createFollowerInput.followerId);

    if (follower) {
      return this.remove(follower.id);
    }
    return this.followerRepo.create({ ...createFollowerInput, userId: user.id });
  }

  async findOne(userId: number, followerId: number): Promise<Follower> {
    return await this.followerRepo.findOne({ where: { userId, followerId } });
  }

  async findAll(userId: number): Promise<Follower[]> {
    return this.followerRepo.findAll({
      where: { userId }, raw: true
    });
  }

  remove(id: number): Promise<number> {
    return this.followerRepo.destroy({ where: { id } });
  }

  async getFollower(followerId: number): Promise<User> {
    return await this.userService.findOne(followerId);
  }
}
