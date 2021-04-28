const { Router } = require('express');
const router = Router();
const Photo = require('../models/photo');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

const prefix = (pref) => pref.length === 0 ? '/' : pref;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', async (req, res) => {
    const photos = await Photo.find();
    // console.log(photos);
    res.render('images', { photos });
});

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('image_form', { photos });
});

router.post('/images/add', async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path); // "{ width: 400 }" este objeto de configuracion, p.ej., le daria 400 px de ancho a la imagen subida. VER NOTA-1 ABAJO
    const { title, description } = req.body;
    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    
    await fs.unlink(req.file.path); // Elimina el archivo de la carpeta uploads
    res.redirect(prefix(process.env.PREFIX_APP));
}); // IMPORTANTE: Las redirecciones necesitan la ruta absoluta

// Hacemos un "truco" para que el boton "delete" nos envie por un metodo "get" la ruta de eliminar imagen
router.get('/images/delete/:photo_id', async (req, res) => {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    // console.log(result);
    res.redirect(`${process.env.PREFIX_APP}/images/add`);
}); // IMPORTANTE: Las redirecciones necesitan la ruta absoluta

module.exports = router;

/* 
    NOTA-1. VER:
    https://cloudinary.com/documentation/node_image_manipulation#the_cloudinary_image_method
*/