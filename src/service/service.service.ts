import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceInput } from './dto/create-service.input';
import { handlePrismaError } from '../utils/prisma-error-handler';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Service[]> {
    try {
      return await this.prisma.service.findMany();
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: string): Promise<Service> {
    try {
      const service = await this.prisma.service.findUnique({ where: { id } });
      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      return service;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(data: CreateServiceInput): Promise<Service> {
    const { type, leads } = data;

    const foundLeads = await this.prisma.lead.findMany({
      where: { id: { in: leads } },
    });

    if (foundLeads.length !== leads.length) {
      throw new BadRequestException('One or more lead IDs are invalid');
    }

    try {
      return await this.prisma.service.create({
        data: {
          type,
          leads: {
            connect: leads.map((id) => ({ id })),
          },
        },
      });
    } catch (error: any) {
      handlePrismaError(error);
    }
  }
}
