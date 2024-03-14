const { addUser, getUsersData, updateUser } = require('../controllers/userController')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const router = require('express').Router()

router.post('/api/v1/addUser', upload.single('pdfFile'), addUser)
  .get('/api/v1/getUsersData', getUsersData)
  .patch('/api/v1/updateUser',updateUser)

module.exports = router