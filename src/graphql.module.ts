import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        formatError: (error) => {
          const originalError = error.extensions?.originalError;
          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions?.code,
            };
          }
          return {
            message:
              typeof originalError === 'object' &&
              originalError &&
              'message' in originalError
                ? (originalError as { message: string }).message
                : error.message,
            code: error.extensions?.code,
          };
        },
        playground: true,
        debug: true,
      }),
    }),
  ],
  exports: [GraphQLModule],
})
export class GqlModule {}
