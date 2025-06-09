import { Test, TestingModule } from '@nestjs/testing';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';
import { CreateLeadInput } from './dto/create-lead.input';
import { Lead } from './entities/lead.entity';

describe('LeadResolver', () => {
  let resolver: LeadResolver;
  let service: LeadService;

  const mockLead: Lead = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+63459212322',
    postcode: '1000',
    services: [],
    createdAt: new Date(),
  };

  const mockLeadService = {
    findAll: jest.fn(() => [mockLead]),
    findOne: jest.fn((id: string) => (id === '1' ? mockLead : null)),
    create: jest.fn((input: CreateLeadInput) => ({
      ...mockLead,
      ...input,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadResolver,
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    resolver = module.get<LeadResolver>(LeadResolver);
    service = module.get<LeadService>(LeadService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('leads', () => {
    it('should return an array of leads', async () => {
      const result = await resolver.leads();
      expect(result).toEqual([mockLead]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('lead', () => {
    it('should return a lead by id', async () => {
      const result = await resolver.lead('1');
      expect(result).toEqual(mockLead);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if lead not found', async () => {
      const result = await resolver.lead('non-existent-id');
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('createLead', () => {
    it('should create and return a new lead', async () => {
      const createLeadInput: CreateLeadInput = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '1000',
        services: [],
      };

      const result = await resolver.createLead(createLeadInput);
      expect(result).toEqual({
        ...mockLead,
        ...createLeadInput,
      });
      expect(service.create).toHaveBeenCalledWith(createLeadInput);
    });
  });
});
