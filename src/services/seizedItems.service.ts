import prisma from "../config/prisma";
import { ItemCategory, ItemStatus } from "@prisma/client";

export const createSeizedItem = async (data: {
    case_id: string;
    item_category: ItemCategory;
    sub_category: string;
    item_description: string;
    seized_date: string;
    seized_location: string;
    seizing_officer: string;
    current_status: ItemStatus;
    release_date: string;
    released_to: string;
    remarks: string;
}) => {
    try{
    const resData = await prisma.seizedItems.create({
        data: {
            case_id: data.case_id,
            item_category: data.item_category,
            sub_category: data.sub_category,
            item_description: data.item_description,
            seized_date: data.seized_date,
            seized_location: data.seized_location,
            seizing_officer: data.seizing_officer,
            current_status: data.current_status,
            release_date: data.release_date,
            released_to: data.released_to,
            remarks: data.remarks,
        },
    });

    return resData;
}catch{
    throw new Error("Error in creating seized item");
}
}
export const createManySeizedItem = async (data: Array<{
    case_id: string,
    item_category: ItemCategory,
    sub_category: string,
    item_description: string,
    seized_date: string,
    seized_location: string,
    seizing_officer: string,
    current_status: ItemStatus,
    release_date: string,
    released_to: string,
    remarks: string
}>) => {
    try{
    const resData = await prisma.seizedItems.createMany({
        data: data.map((item: {
            case_id: string,
            item_category: ItemCategory,
            sub_category: string,
            item_description: string,
            seized_date: string,
            seized_location: string,
            seizing_officer: string,
            current_status: ItemStatus,
            release_date: string,
            released_to: string,
            remarks: string
        }) => ({
            case_id: item.case_id,
            item_category: item.item_category,
            sub_category: item.sub_category,
            item_description: item.item_description,
            seized_date: item.seized_date,
            seized_location: item.seized_location,
            seizing_officer: item.seizing_officer,
            current_status: item.current_status,
            release_date: item.release_date,
            released_to: item.released_to,
            remarks: item.remarks,
        })),
    });

    return resData;
}catch(error){
    throw new Error("Error in creating seized item");
}
}

export const getAllSeizedItems = async (userId: string) => {
    try {
        const caseIds = await prisma.caseReg.findMany({
            where: { userId },
            select: { case_id: true },
        });

        if (caseIds.length === 0) {
            throw new Error("Case not found for the given user.");
        }

        const caseIdList = caseIds.map((caseObj) => caseObj.case_id);

        const seizedItems = await prisma.seizedItems.findMany({
            where: {
                case_id: {
                    in: caseIdList,
                },
            },
        });

        return seizedItems;
    } catch (error) {
        console.error("Error fetching seized items:", error);
        throw new Error("Error in fetching seized items");
    }
};

export const getASeizedItemsFromCase = async(caseID: string) => {
    try {
        const res = await prisma.seizedItems.findMany({
            where: {
                case_id: caseID,
            },
        });

        if (res.length === 0) {
            throw new Error("No seized items found for the given case ID.");
        }

        return res;
    } catch (error) {
        console.error("Error fetching seized items for case:", error);
        throw new Error("Error in fetching seized items for case");
    }
}

export const getSeizedItem = async (item_id: string) => {
    try {
        const resData = await prisma.seizedItems.findUnique({
            where: { item_id },
        });

        return resData;
    } catch (error) {
        console.error("Error fetching seized item:", error);
        throw new Error("Error in fetching seized item");
    }
}

 
export const updateSeizedItem = async (data: {
    item_id: string;
    item_category: ItemCategory;
    sub_category: string;
    item_description: string;
    seized_date: string;
    seized_location: string;
    seizing_officer: string;
    current_status: ItemStatus;
    release_date: string;
    released_to: string;
    remarks: string;
}) => {
    try {
        const resData = await prisma.seizedItems.update({
            where: { item_id: data.item_id },
            data: {
                item_category: data.item_category,
                sub_category: data.sub_category,
                item_description: data.item_description,
                seized_date: data.seized_date,
                seized_location: data.seized_location,
                seizing_officer: data.seizing_officer,
                current_status: data.current_status,
                release_date: data.release_date,
                released_to: data.released_to,
                remarks: data.remarks,
            },
        });

        return resData;
    } catch (error) {
        console.error("Error updating seized item:", error);
        throw new Error("Error in updating seized item");
    }
}