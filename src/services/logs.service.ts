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
        userId: "db46bdb1-cb73-4811-8ec1-7ad56a4b8204",
      },
    });
  } catch (error) {
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
      }

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
      orderBy: {
        timestamp: "asc",
      },
    });
    return logs;
  } catch (error) {
    console.error("Error fetching logs by case ID:", error);
    throw new Error("Error in fetching logs by case ID");
  }
};