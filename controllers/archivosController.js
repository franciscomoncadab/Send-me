const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlace')

exports.subirArchivo = async (req, res, next) => {

     const configuracionMulter = {
          limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
          storage: fileStorage = multer.diskStorage({
               destination: (req, file, cb) => {
                    cb(null, __dirname +'/../uploads');
               },
               filename: (req, file, cb) => { 
                    const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                    cb(null, `${shortid.generate()}${extension}`);
               },
     
          })
     };

     const upload = multer(configuracionMulter).single('archivo');

     upload(req, res, (error) => { 
          console.log(req.file)

          if(!error) {
               res.json({ archivo: req.file.filename})
          } else {
               console.log(error);
               return next();
          }
     });
     
};

exports.eliminarArchivo = async (req, res) => { 
     console.log(req.archivo);

     try {
          fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
          console.log('Se elimino el archivo');
     } catch (error) {
          console.log(error);
     }
};

exports.descargar = async (req, res, next) => {

     const { archivo } = req.params;
     const enlace = await Enlaces.findOne({ nombre: archivo });

     const archivoDescarga = __dirname + `/../uploads/${archivo}`;
     res.download(archivoDescarga);

     const { descargas, nombre } = enlace;

     if (descargas === 1) {

          req.archivo = nombre;

          await Enlaces.findOneAndRemove(enlace.id)
          next();
     } else {
          enlace.descargas--
          await enlace.save();
     }
};