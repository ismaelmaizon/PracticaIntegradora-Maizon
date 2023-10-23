import __dirname from './utils.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('dentro de multer');
        console.log(file);
        if(file.mimetype == 'application/pdf'){
            cb(null, __dirname+'/public/documents')    
        }else {
            cb(null, __dirname+'/public/profiles')
        }
        

    },
    fieldname: function(req, file,cb){
        cb(null, file.originalname)
    }
})


export const uploader = multer({storage})
