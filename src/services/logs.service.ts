import { ActionType, EntityType } from "@prisma/client";
import prisma from "../config/prisma";

export const createLogs = async (
  model: EntityType,
  entityId: string,
  actionType: ActionType,
  changedData: any
) => {
    console.log(model,entityId, actionType, changedData);
    
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
