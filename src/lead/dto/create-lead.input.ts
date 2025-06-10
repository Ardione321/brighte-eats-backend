import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsArray,
} from 'class-validator';

@InputType()
export class CreateLeadInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsMobilePhone()
  mobile: string;

  @Field()
  @IsNotEmpty()
  postcode: string;

  @Field(() => [ID])
  @IsArray()
  services: string[]; 
}
