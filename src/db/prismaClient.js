// src/db/prismaClient.js
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Check if prismaGlobal exists on globalThis, if not, create it
if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma; // Store the Prisma client in globalThis for non-production environments
}

export default prisma;
