import prisma from "../config/prisma";
import { ItemCategory, ItemStatus } from "@prisma/client";

export const createSeizedItem = async (data: {
    case_id: string;
    item_category: ItemCategory;
    sub_category: string;
    item_description: string;
    seized_date: Date;
    seized_location: string;
    seizing_officer: string;
    current_status: ItemStatus;
    release_date: Date;
    released_to: string;
    remarks: string;
}) => {
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
}