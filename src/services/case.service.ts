import prisma from '../config/prisma';
import { generateQRCode } from '../utils/generateQRCode';

export const createCaseAndSeizedItem = async (data: {
  year: number;
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: string;
    filing_date:string;
    acts: any;
    bhags:any;
    guilty_details:string;
    region:string;
    crime_number:string;
    court_order: string;
    closure_date?: string;
    acquired_date: string;
    userId: string;
    
    seize_item_info: [
          {case_id: string;
          item_category: string;
          sub_category: string;
          item_description: string;
          seized_date: string;
          seized_location: string;
          
          seizing_officer: string;
          current_status: string;
          release_date: string;
          released_to: string;
          remarks: string;}
    ];
}) => {
    try{
      const result = await prisma.$transaction(async (prisma) => {
        // Create the case
        const resData = await prisma.caseReg.create({
          data: {
            year: data.year,
            case_number: data.case_number,
            case_description: data.case_description,
            policeStation: {
              connect: {
                id: data.policeStationId,
              },
            },
            investigating_officer: data.investigating_officer,
            case_status: data.case_status,
            crime_number:data.crime_number,
            guilty_details:data.guilty_details,
            region:data.region,
            acts: data.acts,
            filing_date: data.filing_date,
            closure_date: data.closure_date,
            bhags: data.bhags,
            court_order: data.court_order,
            acquired_date: new Date().toISOString(),
            user: {
              connect: {
                id: data.userId,
              },
            },
          },
        });
  
        // Generate QR code for case
        const qrCodePath = await generateQRCode(resData.case_id);
  
        // Update case with QR code
        await prisma.caseReg.update({
          where: { case_id: resData.case_id },
          data: {
            QRbase64: qrCodePath || '',
          },
        });
  
        // Handle seized items
        const allResData = await Promise.all(
          data.seize_item_info.map(async (item) => {
            const createdItem = await prisma.seizedItems.create({
              data: {
                case_id: resData.case_id,
                item_category: item.item_category,
                sub_category: item.sub_category,
                item_description: item.item_description,
                seized_date: item.seized_date,
                seized_location: item.seized_location,
                seizing_officer: item.seizing_officer,
                current_status: item.current_status,
                release_date: item.release_date,
                released_to: item.released_to,
                remarks: item.remarks,
              },
            });
  
            const qrCodePathSeizedItem = await generateQRCode(createdItem.item_id);
  
            await prisma.seizedItems.update({
              where: { item_id: createdItem.item_id },
              data: {
                QRbase64: qrCodePathSeizedItem || '',
              },
            });
  
            return createdItem;
          })
        );
  
        return { resData, allResData };
      });
  
      // console.log('Transaction successful:', result);
      return result;
    }
    catch(error){
      console.log(error,"error");
      
        return {message: "Error in creating case", error};
    }
};

export const getCase = async (id: string) => {
    try {
      return await prisma.caseReg.findUnique({
        where: {
          case_id: id, 
        },
      });
    } catch {
      return { message: "Case not found" };
    }
  };
  

export const getAllCases = async (userId:string) => {
    try {
      const cases = await prisma.caseReg.findMany({
        where: { userId },
        include: {
          seizedItems: true,
        },
      });
      return cases;
  }catch{
    return {message: "Error in fetching cases"};
  }
};

export const updateCase = async (data: {
    case_number: string;
    case_description: string;
    policeStationId: string;
    investigating_officer: string;
    case_status: string;
    filing_date: string;
    closure_date?: string;
    userId: string;
}) => {
    try{
    return prisma.caseReg.update({
        where: {
            case_id: data.case_number,
        },
        data: {
            case_description: data.case_description,
            policeStationId: data.policeStationId,
            investigating_officer: data.investigating_officer,
            case_status: data.case_status,
            filing_date: data.filing_date,
            closure_date: data.closure_date,
            userId: data.userId,
        },
    });
}catch{
    return {message: "Error in updating case"};
}
}

export const getCaseStatusCount = async (userId: string) => {
  try {

     const cases = await prisma.caseReg.findMany({
        where: { userId },
        select: { case_id: true, case_status: true }
     });

     let openCases = 0;
     let closedCases = 0;
     let pendingCases = 0;
     const caseIds: string[] = [];

     cases.forEach(({ case_id, case_status }) => {
        caseIds.push(case_id);
        if (case_status === 'Open') openCases++;
        else if (case_status === 'Closed') closedCases++;
        else if (case_status === 'Investigation') pendingCases++;
     });

     const seizedItemCount = await prisma.seizedItems.count({
        where: { case_id: { in: caseIds } }
     });

     return {
        Open_Cases: openCases,
        Closed_Cases: closedCases,
        Pending_Cases: pendingCases,
        Total_Cases: cases.length,
        Seized_Items: seizedItemCount
     };
  } catch (error) {
     return {message: "Error in getting case status count"};
  }
};