import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { likeProvider } from './like.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [LikesResolver, LikesService, ...likeProvider],
  exports: [LikesService]
})
export class LikesModule { }
