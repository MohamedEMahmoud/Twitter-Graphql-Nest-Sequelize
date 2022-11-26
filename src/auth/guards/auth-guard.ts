import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }

        ctx.user = this.validateToken(ctx.headers.authorization);
        return true;
    }

    validateToken(auth: string): string | jwt.JwtPayload | HttpException {
        const authSplit = auth.split(' ');
        const authorization = authSplit[0] !== 'Bearer';
        if (authorization) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = authSplit[1];
        try {
            return jwt.verify(token, 'secret');
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}