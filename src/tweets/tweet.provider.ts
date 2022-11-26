import { Tweet } from './entities/tweet.entity';

export const tweetProvider = [
    {
        provide: 'TWEET_REPOSITORY',
        useValue: Tweet
    }
];