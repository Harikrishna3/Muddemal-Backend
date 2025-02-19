import prisma from "../config/prisma";

export const createPoliceStationService = async (
    name: string,
    region: string,
    address: string,
    state: string,
    district: string,
    taluka: string
) => {
    try{
    return prisma.policeStation.create({
        data: {
            name,
            region,
            address,
            state,
            district,
            taluka,
        },
    });
}catch{
    throw new Error("Error in creating police station");
}
};