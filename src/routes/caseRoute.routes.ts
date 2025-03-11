import express from 'express';
import { createCase, getAllCases, getCase, getCaseStatusCount, showQRCodeData, updateCase , uploadFirHandler} from '../controllers/case.controller';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Make sure this folder exists or create it dynamically
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // File filter to allow only PDF files
interface MulterFile extends Express.Multer.File {
    mimetype: string;
}

const fileFilter = (req: express.Request, file: MulterFile, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

router.post('/createCase', createCase);
router.post('/updateCase',updateCase);
router.get('/getCaseStatusCount',getCaseStatusCount)
router.get('/getACase/:id',getCase)
router.get('/getCases',getAllCases)
router.get('/showQRCode/:id',showQRCodeData)
router.post('/uploadFir', uploadFirHandler)

export default router;