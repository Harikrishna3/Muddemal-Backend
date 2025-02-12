import prisma from '../config/prisma';

export const createUser = async (name: string, email: string) => {
    return prisma.user.create({
        data: {
            name,
            email,
        },
    });
};

export const getUser = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};