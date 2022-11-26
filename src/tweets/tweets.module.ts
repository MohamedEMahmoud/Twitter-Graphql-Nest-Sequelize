import { forwardRef, Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import { tweetProvider } from './tweet.provider';
import { DatabaseModule } from 'src/database/database.module';
import { LikesModule } from 'src/likes/likes.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, LikesModule, forwardRef(() => UserModule)],
  providers: [TweetsResolver, TweetsService, ...tweetProvider],
  exports: [TweetsService]
})
export class TweetsModule { }
