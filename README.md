# Brighte Eats Backend

A simple backend service built using **NestJS**, **Prisma**, and **GraphQL** for managing leads and services.

---

## Tech Stack

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [GraphQL](https://graphql.org/) - API Query Language
- [Prisma ORM](https://www.prisma.io/) - Database ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Relational Database

---

## Project Structure

src/
├── lead/
│   ├── dto/
│   │   ├── create-lead.input.ts
│   │   └── update-lead.input.ts
│   ├── entities/
│   │   └── lead.entity.ts
│   ├── lead.module.ts
│   ├── lead.resolver.ts
│   └── lead.service.ts
├── service/
│   ├── dto/
│   │   ├── create-service.input.ts
│   │   └── update-service.input.ts
│   ├── entities/
│   │   └── service.entity.ts
│   ├── service.module.ts
│   ├── service.resolver.ts
│   └── service.service.ts
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   └── seed.ts
├── utils/
│   └── prisma-error-handler.ts


## Features

- Create a new Lead with selected Services.
- Fetch all Leads or a single Lead by ID.
- Validate input data using `class-validator`.
- GraphQL resolvers for querying and mutating Lead data.
- Relational modeling using Prisma (Many-to-Many: Lead ↔ Service).
- Unit tests using Jest.

## Database Schema

prisma
  model Lead {
  id String @id @default(uuid())
  name String
  email String @unique
  mobile String @unique
  postcode String
  services Service[] @relation("LeadToService")
  createdAt DateTime @default(now())
}

model Service {
  id String @id @default(uuid())
  type String @unique
  leads Lead[] @relation("LeadToService")
}


## Setup Instructions

git clone https://github.com/your-username/brighte-eats-backend.git
cd brighte-eats-backend

## Install Dependencies

npm install

## Configure Environment

Create a .env file with your PostgreSQL connection string:
DATABASE_URL="postgresql://user:password@localhost:5432/brighte_db"

## Generate Prisma Client

npx prisma generate

## Run Database Migrations (optional)

npx prisma migrate dev --name init

## Seed Initial Data

npm run seed

## Start Development Server

GraphQL Playground will be available at http://localhost:3000/graphql.
npm run start:dev

## Running Tests

To run unit tests:
npm run test

## GrapQL Sample Queries

Create a Lead:
mutation {
  createLead(createLeadInput: {
    name: "John Doe 5",
    email: "John5@example.com",
    mobile: "+639171234565",
    postcode: "1234",
    services: [
      "faba462f-a1e8-4385-bf18-852846c775a9s",
      "f98bcd5d-4a41-4f58-a446-03d02b53e4d7"
    ]
  }) {
    id
    name
    services {
      id
      type
    }
  }
}

Get All Leads:
query {
  leads {
    id
    name
    email
    services {
      type
    }
  }
}

Get Specific Lead By Id:
query {
  lead(id: "f0ebd16b-09f4-47ef-aa56-adb0ab68cb4a") {
    id
    name
    email
    mobile
    postcode
    services {
      id
      type
    }
  }
}

Get All Services: 
query {
  services {
    id
    type
  }
}

Get Specific Service By ID: 
query {
  service(id: "faba462f-a1e8-4385-bf18-852846c775a9") {
    id
    type
  }
}


## License

This project is licensed under the MIT License. See the LICENSE file for details.

