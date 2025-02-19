import { CaseStatus, ItemCategory, ItemStatus } from '@prisma/client';
import { createCaseAndSeizedItem as CC , getCase as GC, updateCase as UC} from '../services/case.service';
import { Request, Response } from 'express';

export const createCase = async (req: Request, res: Response) => {
    const { case_number, case_description, policeStationId, acquired_date,investigating_officer, case_status, filing_date, closure_date, userId } = req.body as {
         case_number: string;
            case_description: string;
            policeStationId: string;
            investigating_officer: string;
            case_status: CaseStatus;
            filing_date: string;
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
    };
try{
    const newCase = await CC({
        case_number,
        case_description,
        policeStationId,
        investigating_officer,
        case_status,
        filing_date,
        closure_date,
        acquired_date,
        userId,
        seize_item_info: req.body.seize_item_info,
    });

    res.status(201).json(newCase);
}catch{
    res.status(400).json({message: "Error in creating case"});
}
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
        filing_date: string;
        closure_date: string;
        userId: string;
    };
    try{
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
}catch{
    res.status(400).json({message: "Error in updating case"});
}
}

