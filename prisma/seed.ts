import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [{ type: 'delivery' }, { type: 'pick-up' }, { type: 'payment' }],
  });
  console.log('Seeding Finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
