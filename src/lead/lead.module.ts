import { Module } from '@nestjs/common';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LeadResolver, LeadService],
})
export class LeadModule {}
