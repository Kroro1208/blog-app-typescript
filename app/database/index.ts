import { PrismaClient } from "@prisma/client";

// Prismaクライアントのインスタンスをグローバル化して使い回す処理
// globalオブジェクトをunknown型から{ prisma: PrismaClient }型にキャスト
const globalPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;

export default prisma;
