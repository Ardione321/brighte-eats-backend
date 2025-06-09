import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Service } from 'src/service/entities/service.entity';

@ObjectType()
export class Lead {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field()
  postcode: string;

  @Field(() => [Service])
  services: Service[];

  @Field()
  createdAt: Date;
}
