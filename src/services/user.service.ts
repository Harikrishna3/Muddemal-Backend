import prisma from "../config/prisma";
import { Role } from '@prisma/client';

// export const createUser = async (name: string, email: string) => {
//     return prisma.user.create({
//         data: {
//             name,
//             email,
//         },
//     });
// };

// export const getUser = async (id: number) => {
//     return prisma.user.findUnique({
//         where: {
//             id,
//         },
//     });
// } ;

 
// export const createSeizedMobile = async (data: {
//     case_id: bigint;
//     item_category: ItemCategory;
//     sub_category: string;
//     item_description: string;
//     seized_date: Date;
//     seized_location: string;
//     seizing_officer: string;
//     current_status: ItemStatus;
//     release_date?: Date | null;
//     released_to?: string | null;
//     remarks?: string | null;
//     mobile: {
//       brand: string;
//       model: string;
//       IMEI_no_1: string;
//       IMEI_no_2?: string | null;
//       serial_no: string;
//       mobile_condition: MobileCondition;
//       charger_available: boolean;
//       sim_card_status: SimCardStatus;
//       network_operator?: string | null;
//       locked_status: LockedStatus;
//     };
//   }) => {
//     try {
//       const seizedMobile = await prisma.seized_Items.create({
//         data: {
//           case_id: data.case_id,
//           item_category: "Mobile",
//           sub_category: data.sub_category,
//           item_description: data.item_description,
//           seized_date: data.seized_date,
//           seized_location: data.seized_location,
//           seizing_officer: data.seizing_officer,
//           current_status: data.current_status,
//           release_date: data.release_date,
//           released_to: data.released_to,
//           remarks: data.remarks,
//           Seized_Mobiles: {
//             create: {
//               brand: data.mobile.brand,
//               model: data.mobile.model,
//               IMEI_no_1: data.mobile.IMEI_no_1,
//               IMEI_no_2: data.mobile.IMEI_no_2,
//               serial_no: data.mobile.serial_no,
//               mobile_condition: data.mobile.mobile_condition,
//               charger_available: data.mobile.charger_available,
//               sim_card_status: data.mobile.sim_card_status,
//               network_operator: data.mobile.network_operator,
//               locked_status: data.mobile.locked_status,
//             },
//           },
//         },
//         include: {
//           Seized_Mobiles: true,
//         },
//       });
  

//          // Convert BigInt values to strings
//     const sanitizedData = JSON.parse(
//         JSON.stringify(seizedMobile, (key, value) =>
//           typeof value === "bigint" ? value.toString() : value
//         )
//       );


//       console.log("Seized Mobile Created:", sanitizedData);
//      return sanitizedData;
//     } catch (error) {
//       console.error("Error creating seized mobile:", error);
//       throw error;
//     } finally {
//       await prisma.$disconnect();
//     }
//   }

export const createUser = async (name: string, email: string, password: string, role: Role = 'USER', policeStationId?: string) => {
    return prisma.user.create({
        data: {
            name,
            email,
            password,
            role,
            policeStationId,
        },
    });
}

export const getUser = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};