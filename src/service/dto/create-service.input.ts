import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  type: string;

  @Field(() => [ID])
  leads: string[];
}
