import { CaseStatus, ItemCategory, ItemStatus } from '@prisma/client';
import prisma from '../config/prisma';

export const createCaseAndSeizedItem = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: CaseStatus;
    filing_date:string;
    closure_date?: string;
    acquired_date: string;
    userId: string;
    seize_item_info: [
          {case_id: string;
          item_category: ItemCategory;
          sub_category: string;
          item_description: string;
          seized_date: string;
          seized_location: string;
          seizing_officer: string;
          current_status: ItemStatus;
          release_date: string;
          released_to: string;
          remarks: string;}
    ];
}) => {
    try{
    const resData = await prisma.caseReg.create({
        data: {     
            case_number: data.case_number,
            case_description: data.case_description,
            policeStation: {
                connect: {
                    id: data.policeStationId,
                },
            },
            investigating_officer: data.investigating_officer,
            case_status: data.case_status,
            filing_date: data.filing_date,
            closure_date: data.closure_date,
            acquired_date: new Date().toISOString(), // Add appropriate value
            case_date: new Date().toISOString(), // Add appropriate value
            user: {
                connect: {
                    id: data.userId,
                },
            },
        },
    });

    // console.log(resData,"resData");
    // console.log(data.seize_item_info,"data.seize_item_info");
    

    const allResData = await Promise.all(
        data.seize_item_info.map(async (item) => {
          const createdItem = await prisma.seizedItems.create({
            data: {
              case_id: resData.case_id,
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
            },
          });
          return createdItem;
        })
      );
    
    return {resData,allResData};
    }
    catch{
        return {message: "Error in creating case"};
    }
};

export const getCase = async (id: string) => {
    try{
    return prisma.caseReg.findUnique({
        where: {
            case_number: id,
        },
    });
}catch{
    return {message: "Case not found"};
}
};

export const updateCase = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: CaseStatus;
    filing_date: string;
    closure_date?: string;
    userId: string;
}) => {
    try{
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
}catch{
    return {message: "Error in updating case"};
}
}