import multer from "multer";
import path from "path";
import fs from "fs";

export const validationType = {
  image: ["image/png", "image/jpg", "image/jpeg"],
  pdf: ["application/pdf"],
};

export const HME = (err, req, res, next) => {
  if (err) {
    res.json({ message: "multer error message", err });
  } else {
    next();
  }
};

export const myMulter = (acceptType, customPath = "uploads") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.resolve(customPath);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (acceptType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError = true;
      cb(null, false);
    }
  };

  return multer({ storage, fileFilter });
};
