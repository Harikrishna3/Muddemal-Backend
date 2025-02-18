import { CaseStatus } from '@prisma/client';
import prisma from '../config/prisma';

export const createCase = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: CaseStatus;
    filing_date: Date;
    closure_date?: Date;
    userId: string;
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
    return resData;
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