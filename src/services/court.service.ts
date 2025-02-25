import { CourtStatus } from '@prisma/client';
import prisma from '../config/prisma';

export const addCourtDeatils = async (data: {
    order_number: string;
    court_type: string;
    court_name: string;
    courtCaseNumber: string;
    court_policestation_info: string;
    court_order_info: string;
    case_id: string;
    hearing_date?: string;
    verdict_date?: string;
    verdict_summary?: string;
    judge_name?: string;
    status: CourtStatus;
}) => {
    try{
        const court = await prisma.court.create({
            data: {
                order_number: data.order_number,
                court_type: data.court_type,
                court_name: data.court_name,
                courtCaseNumber: data.courtCaseNumber,
                court_policestation_info: data.court_policestation_info,
                court_order_info: data.court_order_info,
                case_id: data.case_id,
                hearing_date: data.hearing_date,
                verdict_date: data.verdict_date,
                verdict_summary: data.verdict_summary,
                judge_name: data.judge_name,
                status: data.status
            }
        });
        return court;
    }catch(err){
        console.log(err);
        
        throw err;
    }
}

export const getCourtDetails = async (id: string) => {
    try {
        const court = await prisma.court.findUnique({
            where: {
                id: id
            }
        });
        return court;
    } catch (err) {
        throw err;
    }
}