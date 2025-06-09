
# Brighte Eats Backend

A simple backend service built with **NestJS**, **Prisma**, and **GraphQL** for managing leads and services.

---

## 🚀 Tech Stack

- **NestJS** – Progressive Node.js framework  
- **GraphQL** – API Query Language  
- **Prisma ORM** – Database ORM for PostgreSQL  
- **PostgreSQL** – Relational Database  

---

## 🗂 Project Structure

```
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
```

---

## ✨ Features

- Create a new Lead with selected Services  
- Fetch all Leads or a single Lead by ID  
- Input validation using `class-validator`  
- GraphQL resolvers for querying and mutating data  
- Relational modeling with Prisma (Many-to-Many: Lead ↔ Service)  
- Unit tests with Jest  

---

## 🗄 Database Schema (Prisma)

```prisma
model Lead {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  mobile    String    @unique
  postcode  String
  services  Service[] @relation("LeadToService")
  createdAt DateTime  @default(now())
}

model Service {
  id    String  @id @default(uuid())
  type  String  @unique
  leads Lead[]  @relation("LeadToService")
}
```

---

## ⚙️ Setup Instructions

### Clone the repository

```bash
git clone https://github.com/Ardione321/brighte-eats-backend.git
cd brighte-eats-backend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the root directory with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/brighte_db"
```

### Generate Prisma client

```bash
npx prisma generate
```

### Run database migrations (optional)

```bash
npx prisma migrate dev --name init
```

### Seed initial data

```bash
npm run seed
```

### Start the development server

```bash
npm run start:dev
```

GraphQL Playground will be available at:  
[http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🧪 Running Tests

Run unit tests using Jest:

```bash
npm run test
```

---

## 📋 Sample GraphQL Queries

### Create a Lead

```graphql
mutation {
  createLead(createLeadInput: {
    name: "John Doe 5",
    email: "John5@example.com",
    mobile: "+639171234565",
    postcode: "1234",
    services: [
      "faba462f-a1e8-4385-bf18-852846c775a9",
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
```

### Get All Leads

```graphql
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
```

### Get Specific Lead By ID

```graphql
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
```

### Get All Services

```graphql
query {
  services {
    id
    type
  }
}
```

### Get Specific Service By ID

```graphql
query {
  service(id: "faba462f-a1e8-4385-bf18-852846c775a9") {
    id
    type
  }
}
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
