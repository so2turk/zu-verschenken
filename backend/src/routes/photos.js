const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const Gift = require('../models/gift');
const Photo = require('../models/photo');
const axios = require('axios')

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

router.get('/:imageId', async (req, res) => {
  const image = await Photo.findById(req.params.imageId)

  if (photo) res.send(image)
  else res.sendStatus(404)
})

/* POST a avatar */
router.post('/addAvatar', async (req, res) => {
  if(!req.user) return res.sendStatus(401)
  const avatar = await Photo.create({
    filename: req.body.filename,
    path: req.body.path,
    imgId: req.body.imgId,
    del: req.body.del
  })
  await avatar.addAvatar(req.user)
  res.status(200).send()
})

router.post('/delAvatar', async (req, res) => {
  const user = await User.findById(req.body.userId)
  console.log(user.photos._id, user.photos)
  const ID = ''
  if(user.photos.del) {
    await axios.delete("https://api.imgur.com/3/image/" + user.photos.del,{
    method: "delete", headers: { Authorization: `Client-ID ${ID}` },
    })
  }
  
  await Photo.findByIdAndDelete(user.photos._id)
  user.photos = {}
  console.log("lololol", user.photos)

  res.status(200).send()
})

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
