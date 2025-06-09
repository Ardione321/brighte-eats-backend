import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceInput } from './dto/create-service.input';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findOne(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({ where: { id } });
  }

  async create(data: CreateServiceInput): Promise<Service> {
    const { type, leads } = data;
    return this.prisma.service.create({
      data: {
        type,
        leads: {
          connect: leads.map((id) => ({ id })),
        },
      },
    });
  }
}
