import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;
}
