import { Request, Response } from "express";
import { getLogs as getLogsService, getCaseIdCrimeNoCaseNo as getCaseIdCrimeNoCaseNoService, getLogsByCaseId as getLogsByCaseIdService } from "../services/logs.service";

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await getLogsService();
        res.status(200).json(logs);
    } catch {
        res.status(400).json({ message: "Error in fetching logs" });
    }
    };

export const getCaseIdCrimeNoCaseNo = async (req: Request, res: Response) => {
    try {
        const caseId = await getCaseIdCrimeNoCaseNoService();
        res.status(200).json(caseId);
    } catch {
        res.status(400).json({ message: "Error in fetching case ID, case number, crime number" });
    }
    };

export const getLogsByCaseId = async (req: Request, res: Response) => {
    try {
        const logs = await getLogsByCaseIdService(req.params.caseId);
        res.status(200).json(logs);
    } catch {
        res.status(400).json({ message: "Error in fetching logs" });
    }
    };
