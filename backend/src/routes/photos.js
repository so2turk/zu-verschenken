const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const Gift = require('../models/gift');
const Photo = require('../models/photo');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //cb(null, './public');
    cb(null, path.resolve(__dirname, '../assets'))
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const fileFilter = (req, file, cb) => {
  // reject a file    ----   image/png, image/jpeg, image/gif, image/svg+xml
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }  
};  

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
});

/* POST a avatar */
router.post('/addAvatar', upload.single('avatar'), async (req, res) => {
  if(!req.file) return res.sendStatus(401)
  console.log(req.file)
  const avatar = await Photo.create({ filename: `${req.file.filename}`, path: `${req.file.path}` });
  // await req.user.addAvatar(avatar)
  res.send(avatar);
});

/* POST a photos */
router.post('/:id/photos', upload.single('photo'), async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const gift = await Gift.findById(req.params.giftId)
  if(!gift) return res.sendStatus(404)

  const photo = await Photo.create({ filename: `${req.file.filename}` });
  await req.user.addPhoto(photo, gift)
  res.send(photo);
});

module.exports = router
