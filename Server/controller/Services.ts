import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,'./uploads')
    },
    filename: function (req:Request,file:Express.Multer.File,cb:any) {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024},
    
    fileFilter: (req:Request, file:Express.Multer.File, cb:any) => {
        const fileType = file.mimetype ;
        
        if (fileType=="image/png" ||fileType=="image/jpg" ||fileType=="image/jpeg"||fileType=="image/webp") {
          cb(null, true);
          
        } else {
          cb(null, false);
       
          return cb('Only .png, .jpg and .jpeg format allowed!');
        }
    }
})

export default upload