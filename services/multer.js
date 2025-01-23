import multer from 'multer';

export const validationType = {
    image: ["image/png", "image/jpg", "image/jpeg"],
    pdf: ["application/pdf"]
}

export const HME = (err, req, res, next) => {
    if (err) {
        res.json({ message: "multer error message", err })
    } else {
        next()
    }
}


export const myMulter = (acceptType) => {

    const storage = multer.diskStorage({
    })

    function fileFilter(req, file, cb) {
        if (acceptType.includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.imageError = true;
            cb(null, false)
        }
    }
    const upload = multer({ dest: "uploads", storage, fileFilter })
    return upload
}
