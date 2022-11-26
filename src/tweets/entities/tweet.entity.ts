import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Table({ tableName: 'tweets', timestamps: true })
@ObjectType()
export class Tweet extends Model {

  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @IsString()
  @Field(() => String)
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @IsString()
  @Field(() => String, { nullable: true })
  @Column({ type: DataType.TEXT, allowNull: true, defaultValue: '' })
  image_url: string;

  @ForeignKey(() => User)
  @Column
  @Field(() => Int)
  userId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user: User;

  @HasMany(() => Like)
  @Field(() => [Like])
  likes: Like[];


  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

}
