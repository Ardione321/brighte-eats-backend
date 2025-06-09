import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Lead } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadInput } from './dto/create-lead.input';
import { handlePrismaError } from '../utils/prisma-error-handler';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Lead[]> {
    try {
      return await this.prisma.lead.findMany({
        include: {
          services: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: string): Promise<Lead> {
    try {
      const lead = await this.prisma.lead.findUnique({
        where: { id },
        include: { services: true },
      });

      if (!lead) {
        throw new NotFoundException(`Lead with id ${id} not found`);
      }

      return lead;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(data: CreateLeadInput): Promise<Lead> {
    const { services, name, email, mobile, postcode } = data;

    try {
      const foundServices = await this.prisma.service.findMany({
        where: { id: { in: services } },
        select: { id: true },
      });

      if (foundServices.length !== services.length) {
        throw new BadRequestException('One or more services IDs are invalid');
      }

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
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
