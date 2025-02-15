import { CaseStatus } from '@prisma/client';
import { createCase as CC , getCase as GC, updateCase as UC} from '../services/case.service';
import { Request, Response } from 'express';

export const createCase = async (req: Request, res: Response) => {
    const { case_number, case_description, policeStationId, investigating_officer, case_status, filing_date, closure_date, userId } = req.body as {
        case_number: string;
        case_description: string;
        policeStationId: string;
        investigating_officer: string;
        case_status: CaseStatus; // Assuming CaseStatus is a union type
        filing_date: Date;
        closure_date: Date;
        userId: string;
    };

    const newCase = await CC({
        case_number,
        case_description,
        policeStationId,
        investigating_officer,
        case_status,
        filing_date,
        closure_date,
        userId,
    });

    res.status(201).json(newCase);
};

export const getCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const caseData = await GC(id);
    res.status(200).json(caseData);
}

export const updateCase = async (req: Request, res: Response) => {
    const { case_number, case_description, policeStationId, investigating_officer, case_status, filing_date, closure_date, userId } = req.body as {
        case_number: string;
        case_description: string;
        policeStationId: string;
        investigating_officer: string;
        case_status: CaseStatus; // Assuming CaseStatus is a union type
        filing_date: Date;
        closure_date: Date;
        userId: string;
    };
    const response = await UC({
        case_number,
        case_description,
        policeStationId,
        investigating_officer,
        case_status,
        filing_date,
        closure_date,
        userId,
    });
    res.status(200).json(response);
}

