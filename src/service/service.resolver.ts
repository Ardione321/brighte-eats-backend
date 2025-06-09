import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

  @Query(() => [Service])
  services() {
    return this.serviceService.findAll();
  }

  @Query(() => Service, { nullable: true })
  service(@Args(`id`, { type: () => ID }) id: string) {
    return this.serviceService.findOne(id);
  }

  @Mutation(() => Service)
  createService(
    @Args(`createServiceInput`) createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }
}
