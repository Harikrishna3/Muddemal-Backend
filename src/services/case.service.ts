import { CaseStatus, ItemCategory, ItemStatus } from '@prisma/client';
import prisma from '../config/prisma';

export const createCaseAndSeizedItem = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: CaseStatus;
    filing_date: Date;
    closure_date?: Date;
    userId: string;
    seize_item_info: [
          {case_id: string;
          item_category: ItemCategory;
          sub_category: string;
          item_description: string;
          seized_date: Date;
          seized_location: string;
          seizing_officer: string;
          current_status: ItemStatus;
          release_date: Date;
          released_to: string;
          remarks: string;}
    ];
}) => {
    const resData = await prisma.caseReg.create({
        data: {     
            case_number: data.case_number,
            case_description: data.case_description,
            policeStationId: data.policeStationId,
            investigating_officer: data.investigating_officer,
            case_status: data.case_status,
            filing_date: data.filing_date,
            closure_date: data.closure_date,
            userId: data.userId,
        },
    });

    const allResData = await Promise.all(data.seize_item_info.map(async (item) => {
        await prisma.seizedItems.create({
            data: {
                case_id: resData.case_number,
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
            }
        });
    }));
    return allResData;
};

export const getCase = async (id: string) => {
    return prisma.caseReg.findUnique({
        where: {
            case_number: id,
        },
    });
};

export const updateCase = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: CaseStatus;
    filing_date: Date;
    closure_date?: Date;
    userId: string;
}) => {
    return prisma.caseReg.update({
        where: {
            case_number: data.case_number,
        },
        data: {
            case_description: data.case_description,
            policeStationId: data.policeStationId,
            investigating_officer: data.investigating_officer,
            case_status: data.case_status,
            filing_date: data.filing_date,
            closure_date: data.closure_date,
            userId: data.userId,
        },
    });
}