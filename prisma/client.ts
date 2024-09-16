import { PrismaClient } from "@prisma/client";
//This is where we instatiate prisma for the application. Used all throughout the app
//Copy spaghetti pasta bolognese: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// creating single instance of prisma client for use with NextJS
const prismaClientSingleton = () => {
  //Can log all db queries. To optimizing backend calling
  //
  return new PrismaClient({
    // log: ["query"],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
