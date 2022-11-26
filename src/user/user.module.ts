import { userProvider } from './user.provider';
import { DatabaseModule } from './../database/database.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { FollowersModule } from 'src/followers/followers.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TweetsModule),
    forwardRef(() => FollowersModule)
  ],
  providers: [UserResolver, UserService, ...userProvider],
  exports: [UserService]
})
export class UserModule { }
