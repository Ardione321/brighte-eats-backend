import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = host.switchToHttp();

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      return {
        message: (response as any).message || exception.message,
        statusCode: exception.getStatus(),
      };
    }

    return {
      message: 'Unexpected error occurred',
      statusCode: 500,
    };
  }
}
