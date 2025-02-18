import { PrismaClient, Prisma, ActionType, EntityType } from '@prisma/client';
import prisma from '../config/prisma';

const applyMiddleware = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const { model, action, args } = params;
    const trackedModels = ['CaseReg', 'SeizedItems', 'Court'];

    if (!trackedModels.includes(model!)) return next(params);

    let entityId: string | null = null;
    let changedData: any = null;
    let actionType: ActionType | null = null;

    if (action === 'create') {
      actionType = ActionType.Created;
      changedData = args.data;
      const result = await next(params);
      entityId = result?.id ?? null;
      if (entityId !== null) {
        await logAction(mapModelToEntityType(model!), entityId, actionType, changedData);
      }
      return result;
    }

    if (action === 'update') {
      actionType = ActionType.Updated;
      entityId = args.where?.id ?? null;
      const existingData = await (prisma as any)[model!.charAt(0).toLowerCase() + model!.slice(1)]?.findUnique({ where: args.where });

      changedData = { before: existingData, after: args.data };
      const result = await next(params);
      if (entityId !== null) {
        await logAction(mapModelToEntityType(model!), entityId, actionType, changedData);
      }
      return result;
    }

    if (action === 'delete') {
      actionType = ActionType.Deleted;
      entityId = args.where.id;
      const existingData = await (prisma as any)[model!.charAt(0).toLowerCase() + model!.slice(1)]?.findUnique({ where: args.where });

      changedData = { deleted: existingData };
      const result = await next(params);
      if (entityId !== null) {
        await logAction(mapModelToEntityType(model!), entityId, actionType, changedData);
      }
      return result;
    }

    return next(params);
  });
};

// **Mapping Prisma ModelName to EntityType**
const modelNameToEntityType: Record<string, EntityType> = {
  CaseReg: EntityType.CaseReg,
  SeizedItems: EntityType.SeizedItem,
  Court: EntityType.Court,
};

// **Helper function to map ModelName to EntityType**
function mapModelToEntityType(model: string): EntityType {
  if (!(model in modelNameToEntityType)) {
    throw new Error(`Unknown model: ${model}`);
  }
  return modelNameToEntityType[model];
}

// **Logging function**
async function logAction(
  model: EntityType,
  entityId: string,
  actionType: ActionType,
  changedData: any
) {
  try {
    // Ensure entityId is safely converted
    // const safeEntityId = BigInt(entityId);

    await prisma.logs.create({
      data: {
        entityType: model,
        entityId, 
        actionType,
        changedData,
        userId: "SYSTEM",
      },
    });

    console.log(`Log recorded for ${model} - Action: ${actionType}`);
  } catch (error) {
    console.error("Error logging action:", error);
  }
}

export default applyMiddleware;
