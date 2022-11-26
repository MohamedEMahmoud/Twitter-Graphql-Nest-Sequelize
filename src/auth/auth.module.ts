import { userProvider } from './../user/user.provider';
import { UserModule } from './../user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, AuthResolver, ...userProvider],
  exports: [AuthService]
})
export class AuthModule { }
