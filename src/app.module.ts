import { Module } from '@nestjs/common';
import { LeadModule } from './lead/lead.module';
import { ServiceModule } from './service/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GqlModule } from './graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GqlModule,
    LeadModule,
    ServiceModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
