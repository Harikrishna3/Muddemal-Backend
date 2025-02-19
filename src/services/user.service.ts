import prisma from "../config/prisma";
import { Role } from '@prisma/client';

export const createUser = async (name: string, email: string, password: string, role: Role = 'USER', policeStationId?: string) => {
    try{
    return prisma.user.create({
        data: {
            name,
            email,
            password,
            role,
            policeStationId,
        },
    });
}catch{
    throw new Error("Error in creating user");
}
}

export const getUser = async (id: string) => {
    try{
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}catch{
    throw new Error("Error in getting user");
}
};