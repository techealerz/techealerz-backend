const { createJob, getJobs, deleteJob } = require('../controllers/jobController')
const authenticateUser = require('../middleware/authMiddleware')

const router = require('express').Router()


router.post('/api/v1/createJob',authenticateUser,createJob)
    .get('/api/v1/getJobs', getJobs)
    .delete('/api/v1/deleteJob/:id',authenticateUser,deleteJob)
    


module.exports = router