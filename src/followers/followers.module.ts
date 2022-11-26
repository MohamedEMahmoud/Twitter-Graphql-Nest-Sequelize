import { forwardRef, Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersResolver } from './followers.resolver';
import { followerProvider } from './follower.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [FollowersResolver, FollowersService, ...followerProvider],
  exports: [FollowersService]
})
export class FollowersModule { }
