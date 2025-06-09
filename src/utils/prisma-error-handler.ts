import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

export function handlePrismaError(error: any): never {
  if (error?.code) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictException(
          'Unique constraint failed: duplicate value',
        );

      case 'P2025':
        throw new BadRequestException(error.message || 'Record not found');

      case 'P2021':
        throw new BadRequestException(
          error.message ||
            'One or more related records required for this operation were not found.',
        );

      default:
        console.error(
          'Prisma error code:',
          error.code,
          'Message:',
          error.message,
        );
        throw new InternalServerErrorException('Database error occurred');
    }
  }

  console.error('Unknown Prisma error:', error);
  throw new InternalServerErrorException(
    error.message || 'An unexpected error occurred',
  );
}
