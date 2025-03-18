
import prisma from '../config/prisma';
import { generateQRCode } from '../utils/generateQRCode';
import { uploadItemImage } from '../utils/uploadItemImage';

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
    acquire_date: string;
    seized_date: string;
    userId: string;
    images: any;
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
          remarks: string;
          Bhag?: string;
          depositDate?: string;
          fromWhomReceived?: string;
          weight?: string;
          NoOfItems?: string;
          itemStateDescription?: string;
          images: any;
          price?: string; 
        }
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
            acquire_date: data.acquire_date,
            seized_date: data.seized_date,
            bhags: data.bhags,
            court_order: data.court_order,
            user: {
              connect: {
                id: data.userId,
              },
            },
          },
        });
  
        // Generate QR code for case
        const qrCodePath = await generateQRCode(resData.case_id, 'case');
  
        // Update case with QR code
        await prisma.caseReg.update({
          where: { case_id: resData.case_id },
          data: {
            QRbase64: qrCodePath || '',
          },
        });

        const imgsLinkArray = await Promise.all(
          
          data.images?.map(async (img: any) => {
            
            const createdImg = await uploadItemImage(img);
            
            return createdImg;
          })
        );
        
        await prisma.caseReg.update({
          where: { case_id: resData.case_id },
          data: { images: imgsLinkArray }
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
                Bhag: item.Bhag,
                depositDate: item.depositDate,
                fromWhomReceived: item.fromWhomReceived,
                weight: item.weight,
                NoOfItems: item.NoOfItems,
                itemStateDescription: item.itemStateDescription,
                price: item.price
              },
            });
  
            const qrCodePathSeizedItem = await generateQRCode(createdItem.item_id, 'seizedItem');
  
            await prisma.seizedItems.update({
              where: { item_id: createdItem.item_id },
              data: {
                QRbase64: qrCodePathSeizedItem || '',
              },
            });

            const imgsLinkArray = await Promise.all(
            
              item.images?.map(async (img: any) => {
                if(img.includes('https://')){
                  return img;
                }else{
                  const createdImg = await uploadItemImage(img);
                  return createdImg;
                }
              })
            );
            
            await prisma.seizedItems.update({
              where: { item_id: createdItem.item_id },
              data: { images: imgsLinkArray }
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
  case_id: string;
  year: number;
  case_number: string;
  crime_number: string;
  guilty_details: string;
  region: string;
  case_description: string;
  policeStationId: string;
  investigating_officer: string;
  case_status: string;
  filing_date: string;
  acts: any;
  CaseStatus: string;
  court_order: string;
  closure_date?: string;
  acquired_date: string;
  userId: string;
  bhags: any;
  images: any;
  seize_item_info: [
    {
      item_id: string;
      item_category: string;
      sub_category: string;
      item_description: string;
      seized_date: string;
      seized_location: string;
      seizing_officer: string;
      current_status: string;
      release_date: string;
      released_to: string;
      remarks: string;
      Bhag?: string;
      depositDate?: string;
      fromWhomReceived?: string;
      weight?: string;
      NoOfItems?: string;
      itemStateDescription?: string;
      images: any;
      price?: string;
    }
  ];
}) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Delete old seized items
      // await prisma.seizedItems.deleteMany({
      //   where: {
      //     case_id: data.case_id,
      //   },
      // });

      // // Delete old case
      // await prisma.caseReg.delete({
      //   where: {
      //     case_id: data.case_id,
      //   },
      // });

      // Create new case
      const newCase = await prisma.caseReg.update({
        where: { case_id: data.case_id },
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
          crime_number: data.crime_number,
          guilty_details: data.guilty_details,
          region: data.region,
          acts: data.acts,
          filing_date: data.filing_date,
          closure_date: data.closure_date,
          bhags: data.bhags,
          court_order: data.court_order,
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      });

      // Generate QR code for new case
      // const qrCodePath = await generateQRCode(newCase.case_id, 'case');

      // // Update new case with QR code
      // await prisma.caseReg.update({
      //   where: { case_id: newCase.case_id },
      //   data: {
      //     QRbase64: qrCodePath || '',
      //   },
      // });

      const imgsLinkArray = await Promise.all(
          
        data.images?.map(async (img: any) => {
          if(img.includes('https://')){
            return img;
          }else{
            const createdImg = await uploadItemImage(img);
            return createdImg;
          }
          
        })
      );
      
      await prisma.caseReg.update({
        where: { case_id: newCase.case_id },
        data: { images: imgsLinkArray }
      });

      const existingItems = await prisma.seizedItems.findMany({
        where: { case_id: data.case_id },
      });
      
      const incomingItemIds = data?.seize_item_info?.map((item) => item.item_id);
      const existingItemIds = existingItems?.map((item) => item.item_id);
      
      // Step 2: Delete removed items
      const itemsToDelete = existingItemIds?.filter(id => !incomingItemIds?.includes(id));
      
      await prisma.seizedItems.deleteMany({
        where: {
          item_id: { in: itemsToDelete }
        }
      });
      

      // Handle seized items
      const newSeizedItems = await Promise.all(
        (data.seize_item_info || []).map(async (item) => {
          const createdItem = await prisma.seizedItems.upsert({
            where: { item_id: item.item_id || '' },
            update: {
              case_id: newCase.case_id,
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
              Bhag: item.Bhag,
              depositDate: item.depositDate,
              fromWhomReceived: item.fromWhomReceived,
              weight: item.weight,
              NoOfItems: item.NoOfItems,
              itemStateDescription: item.itemStateDescription,
              price: item.price
            },
            create: {
              item_id: item.item_id,
              case_id: newCase.case_id,
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
              Bhag: item.Bhag,
              depositDate: item.depositDate,
              fromWhomReceived: item.fromWhomReceived,
              weight: item.weight,
              NoOfItems: item.NoOfItems,
              itemStateDescription: item.itemStateDescription,
              price: item.price
            },
          });

          const qrCodePathSeizedItem = await generateQRCode(createdItem.item_id, 'seizedItem');

          await prisma.seizedItems.update({
            where: { item_id: createdItem.item_id },
            data: {
              QRbase64: qrCodePathSeizedItem || '',
            },
          });

          const imgsLinkArray = await Promise.all(
          
            item.images?.map(async (img: any) => {
              
              const createdImg = await uploadItemImage(img);
              
              return createdImg;
            })
          );
          
          await prisma.seizedItems.update({
            where: { item_id: createdItem.item_id },
            data: { images: imgsLinkArray }
          });

          return createdItem;
        })
      );

      return { newCase, newSeizedItems };
    });

    return result;
  } catch (error) {
    console.log(error, "error");
    return { message: "Error in updating case", error };
  }
};

export const getCaseStatusCount = async (userId: string) => {
  try {
    const cases = await prisma.caseReg.findMany({
      where: { userId },
      select: { case_id: true, case_status: true }
    });
    console.log(userId, "userId","getCaseStatusCount");
    

    let openCases = 0;
    let closedCases = 0;
    let pendingCases = 0;
    let aFinalCases = 0;
    let cFinalCases = 0;
    let trialPendingCases = 0;
    let psPendingCases = 0;
    let darmentCases = 0;
    let courtPoliceDisposalCases = 0;
    const caseIds: string[] = [];

    cases.forEach(({ case_id, case_status }) => {
      caseIds.push(case_id);
      if (case_status === 'Open') openCases++;
      else if (case_status === 'Closed') closedCases++;
      else if (case_status === 'Investigation') pendingCases++;
      else if (case_status === 'A final') aFinalCases++;
      else if (case_status === 'C final') cFinalCases++;
      else if (case_status === 'Trial/Pending') trialPendingCases++;
      else if (case_status === 'PS Pending') psPendingCases++;
      else if (case_status === 'Darment Case') darmentCases++;
      else if (case_status === 'Court/Police Station Disposal') courtPoliceDisposalCases++;
    });

    const seizedItemCount = await prisma.seizedItems.count({
      where: { case_id: { in: caseIds } }
    });

    return {
      Open_Cases: openCases,
      Closed_Cases: closedCases,
      Pending_Cases: pendingCases,
      A_Final_Cases: aFinalCases,
      C_Final_Cases: cFinalCases,
      Trial_Pending_Cases: trialPendingCases,
      PS_Pending_Cases: psPendingCases,
      Darment_Cases: darmentCases,
      Court_Police_Station_Disposal: courtPoliceDisposalCases,
      Total_Cases: cases.length,
      Seized_Items: seizedItemCount
    };
  } catch (error) {
    return { message: "Error in getting case status count" };
  }
};

export const showQRCode = async (id: string) => {
  try {
    const caseData = await prisma.caseReg.findUnique({
      where: { case_id: id },
      include: {
        seizedItems: true,
      },
    });

    return caseData;
  } catch {
    return { message: "QR Code not found" };
  }
}


