import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Model, BelongsTo, ForeignKey, Column } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'followers', timestamps: true })
@ObjectType()
export class Follower extends Model {

  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  id: number;

  @ForeignKey(() => User)
  @Column
  @Field(() => Int, { nullable: true })
  userId: number;

  @ForeignKey(() => User)
  @Column
  @Field(() => Int, { nullable: true })
  followerId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user: User;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
