import { Injectable } from '@nestjs/common';
import { Lead } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadInput } from './dto/create-lead.input';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Lead[]> {
    return await this.prisma.lead.findMany({
      include: {
        services: true,
      },
    });
  }

  async findOne(id: string): Promise<Lead | null> {
    return await this.prisma.lead.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });
  }

  async create(data: CreateLeadInput): Promise<Lead> {
    const { services, name, email, mobile, postcode } = data;

    return await this.prisma.lead.create({
      data: {
        name,
        email,
        mobile,
        postcode,
        services: {
          connect: services.map((id) => ({ id })),
        },
      },
      include: {
        services: true,
      },
    });
  }
}
