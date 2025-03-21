import { ActionType, EntityType } from "@prisma/client";
import prisma from "../config/prisma";

export const createLogs = async (
  model: EntityType,
  entityId: string,
  actionType: ActionType,
  changedData: any
) => {
    
  try {
    await prisma.logs.create({
      data: {
        entityType: model,
        entityId,
        actionType,
        changedData,
        userId: "742f0764-3fa5-4683-a3c7-1ec91c16b6fe",
      },
    });
  } catch(error) {
    console.error("Error logging action:", error);
  }
};

export const getLogs = async () => {
  try {
    const logs = await prisma.logs.findMany();
    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw new Error("Error in fetching logs");
  }
};

export const getCaseIdCrimeNoCaseNo = async () => {
  try {
    const caseId = await prisma.caseReg.findMany({
      select: {
      case_id: true,
      case_number: true,
      crime_number: true,
      },
      where: {
      createdAt: {
        gte: new Date('2025-03-21T00:00:00.000Z'),
        lt: new Date('2025-03-22T00:00:00.000Z'),
      },
      },
      orderBy: {
      createdAt: 'desc',
      },
    });
    return caseId;
  } catch (error) {
    console.error("Error fetching case ID, case number, crime number:", error);
    throw new Error("Error in fetching case ID, case number, crime number");
  }
};

export const getLogsByCaseId = async (caseId: string) => {
  try {
    const logs = await prisma.logs.findMany({
      where: {
        entityId: caseId,
      },
    });
    return logs;
  } catch (error) {
    console.error("Error fetching logs by case ID:", error);
    throw new Error("Error in fetching logs by case ID");
  }
};