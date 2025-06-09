import { Args, Query, Resolver, ID, Mutation } from '@nestjs/graphql';
import { LeadService } from './lead.service';
import { Lead } from './entities/lead.entity';
import { CreateLeadInput } from './dto/create-lead.input';

@Resolver(() => Lead)
export class LeadResolver {
  constructor(private leadService: LeadService) {}

  @Query(() => [Lead])
  leads() {
    return this.leadService.findAll();
  }

  @Query(() => Lead, { nullable: true })
  lead(@Args('id', { type: () => ID }) id: string) {
    return this.leadService.findOne(id);
  }

  @Mutation(() => Lead)
  createLead(@Args('createLeadInput') createLeadInput: CreateLeadInput) {
    return this.leadService.create(createLeadInput);
  }
}
