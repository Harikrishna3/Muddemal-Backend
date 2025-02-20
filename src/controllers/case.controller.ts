import { CaseStatus, ItemCategory, ItemStatus } from '@prisma/client';
import { createCaseAndSeizedItem as CC , getCase as GC, updateCase as UC, getAllCases as GAC, getCaseStatusCount as GCSC} from '../services/case.service';
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createCase = async (req: Request, res: Response) => {
    const { case_number, case_description,year, court_order,policeStationId, acquired_date,investigating_officer, case_status, filing_date, closure_date, userId } = req.body as {
         year: number;
        case_number: string;
            case_description: string;
            policeStationId: string;
            investigating_officer: string;
            case_status: CaseStatus;
            filing_date: string;
            acts: any;
            court_order: string;
            closure_date?: string;
            acquired_date: string;
            userId: string;
            bhags : any;
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
        year,
        case_number,
        case_description,
        policeStationId,
        investigating_officer,
        bhags: req.body.bhags,
        case_status,
        filing_date,
        court_order: court_order,
        acts: req.body.acts,
        closure_date,
        acquired_date,
        userId,
        seize_item_info: req.body.seize_item_info,
    });

    
    res.status(201).json(newCase);
}catch(error){
    res.status(400).json({message: "Error in creating case", error});
}
};

export const getCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const caseData = await GC(id);
    res.status(200).json(caseData);
}

export const getAllCases = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try{
    const cases = await GAC(userId);
    res.status(200).json(cases);
    }
    catch{
        res.status(400).json({message: "Error in fetching cases"});
    }
}

export const updateCase = async (req: Request, res: Response) => {
    const { case_number, case_description, bhags, year, acts, court_order, policeStationId, acquired_date, investigating_officer, case_status, filing_date, closure_date, userId } = req.body as {
        year: number;
        case_number: string;
        case_description: string;
        policeStationId: string;
        investigating_officer: string;
        case_status: CaseStatus;
        filing_date: string;
        acts: any;
        court_order: string;
        closure_date?: string;
        acquired_date: string;
        userId: string;
        bhags: any;
    };

    if (!case_number || !case_description || !policeStationId || !investigating_officer || !case_status || !filing_date || !acquired_date || !userId) {
         res.status(400).json({ message: "Missing required fields" });
            return;
    }

    try {
        const caseData: any = {
            year,
            case_number,
            case_description,
            policeStationId,
            investigating_officer,
            bhags,
            case_status,
            filing_date,
            court_order,
            acts,
            acquired_date,
            userId,
        };

        if (closure_date) caseData.closure_date = closure_date;

        const response = await UC(caseData);
        res.status(200).json({ success: true, data: response });
    } catch (error: any) {
        console.error("Update case error:", error);
        res.status(400).json({ message: "Error in updating case", error: error?.message || "Unknown error" });
    }
};


export const getCaseStatusCount = async (req: Request, res: Response) => {
    try {
       const caseStatusCount = await GCSC(req.params.userId);
       res.status(200).json(caseStatusCount);
    } catch (error) {
       console.error("Error fetching case status count:", error);
       res.status(400).json({ message: "Error in getting case status count" });
    }
 };
 
 

