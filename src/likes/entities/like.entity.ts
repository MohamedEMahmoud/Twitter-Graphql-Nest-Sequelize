import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Model, BelongsTo, Column, ForeignKey } from 'sequelize-typescript';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'likes', timestamps: true })
@ObjectType()
export class Like extends Model {
  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  @Field(() => Int, { nullable: true })
  userId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user: User;

  @ForeignKey(() => Tweet)
  @Column
  @Field(() => Int, { nullable: true })
  tweetId: number;


  @BelongsTo(() => Tweet)
  tweets: Tweet[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

}
