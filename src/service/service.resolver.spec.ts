import { Test, TestingModule } from '@nestjs/testing';
import { ServiceResolver } from './service.resolver';
import { ServiceService } from './service.service';
import { CreateServiceInput } from './dto/create-service.input';
import { Service } from '@prisma/client';

describe('ServiceResolver', () => {
  let resolver: ServiceResolver;
  let service: ServiceService;

  const mockService: Service = {
    id: '1',
    type: 'Cleaning',
  };

  const mockServiceService = {
    findAll: jest.fn(() => [mockService]),
    findOne: jest.fn((id: string) => (id === '1' ? mockService : null)),
    create: jest.fn((input: CreateServiceInput) => ({
      id: '1',
      type: input.type,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceResolver,
        {
          provide: ServiceService,
          useValue: mockServiceService,
        },
      ],
    }).compile();

    resolver = module.get<ServiceResolver>(ServiceResolver);
    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('services', () => {
    it('should return all services', async () => {
      const result = await resolver.services();
      expect(result).toEqual([mockService]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('service', () => {
    it('should return a service by id', async () => {
      const result = await resolver.service('1');
      expect(result).toEqual(mockService);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if service not found', async () => {
      const result = await resolver.service('non-existent-id');
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('createService', () => {
    it('should create and return a new service', async () => {
      const input: CreateServiceInput = {
        type: 'Cleaning',
        leads: [],
      };

      const result = await resolver.createService(input);
      expect(result).toEqual({ id: '1', type: 'Cleaning' });
      expect(service.create).toHaveBeenCalledWith(input);
    });
  });
});
