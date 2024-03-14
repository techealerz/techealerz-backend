const { createTrainingUser, getAllTrainingUsers } = require('../controllers/trainingController')

const router = require('express').Router()

router.post('/api/v1/createTrainingUser', createTrainingUser)
    .get('/api/v1/getAllTrainingUsers', getAllTrainingUsers)


module.exports = router