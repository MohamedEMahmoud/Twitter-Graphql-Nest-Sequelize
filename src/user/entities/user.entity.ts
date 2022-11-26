import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { IsString, IsAlpha, IsEmail } from 'class-validator';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Follower } from 'src/followers/entities/follower.entity';

@Table({ tableName: 'users', timestamps: true })
@ObjectType()
export class User extends Model {

  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @IsAlpha()
  @Field(() => String)
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  username: string;

  @IsEmail()
  @Field(() => String)
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email: string;

  @IsString()
  @HideField()
  @Column({ type: DataType.STRING(100), allowNull: false })
  password: string;

  @IsString()
  @Field(() => String)
  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2fo-NSHe-oXD5JfuWEjVVc&ust=1669536420043000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKDnw_uxy_sCFQAAAAAdAAAAABAE' })
  avatar: string;

  @Field(() => String, { nullable: true })
  token: string;

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets: Tweet[];

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Follower)
  @Field(() => [Follower], {
    nullable: true
  })
  followers: Follower[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
