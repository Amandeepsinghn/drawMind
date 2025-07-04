import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

// Also export the PrismaClient class for type usage
export { PrismaClient };
