import { Follower } from './entities/follower.entity';

export const followerProvider = [{
    provide: 'FOLLOWER_REPOSITORY',
    useValue: Follower
}];