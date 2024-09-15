import { PrismaClient } from "@prisma/client";
// creating single instance of prisma client for use with NextJS

const prismaClientSingleton = () => {
  //we are logging all db queries. Used for optimizing backend calling
  return new PrismaClient({
    log: ["query"],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
