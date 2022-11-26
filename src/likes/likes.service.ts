import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateLikeInput } from './dto/create-like.input';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

  constructor(
    @Inject('LIKE_REPOSITORY') private readonly likeRepo: typeof Like,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService
  ) { }

  async create(createLikeInput: CreateLikeInput, user: User): Promise<number | Like> {
    const like = await this.findOne(user.id, createLikeInput.tweetId);

    if (like) {
      return this.remove(like.id);
    }

    return this.likeRepo.create({ ...createLikeInput, userId: user.id });
  }

  async findOne(userId: number, tweetId: number): Promise<Like> {
    return await this.likeRepo.findOne({ where: { userId, tweetId } });
  }

  remove(id: number): Promise<number> {
    return this.likeRepo.destroy({ where: { id } });
  }

  async findAllLikesByTweet(tweetId: number) {
    return this.likeRepo.findAll({ where: { tweetId } });
  }

  async getUser(userId: number): Promise<User> {
    return await this.userService.findOne(userId);
  }
}
