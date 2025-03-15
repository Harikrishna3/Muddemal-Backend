import { PrismaClient } from '@prisma/client';
import applyMiddleware from '../prisma/prismaMiddleware';

const prisma = new PrismaClient();
// applyMiddleware(prisma);

export default prisma;