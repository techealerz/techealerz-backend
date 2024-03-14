const jobs = require("../models/jobModel")




// create job

const createJob = async (req, res) => {
    const { title, experience, opening, description } = req.body
    try {
        const data = new jobs({
            title,
            experience,
            opening,
            description
        })
        await data.save()
        return res.status(201).json({ message: "Created Successfully!", success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// read 

const getJobs = async (req, res) => {
    try {
        console.log('jobs in backend get req')
        const job = await jobs.find()
        return res.status(200).json({ job, success: true })
    } catch (error) {
        console.log('erro in backend ', error)
        return res.status(404).json({ error: error.message, success: false })
    }
}


//  delete job

const deleteJob = async (req, res) => {
    const { id } = req.params
    try {
        console.log('delete job in backend is  : ', req.params)
        const data = await jobs.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "Item Deleted Successfully!!", success: true })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }

}


module.exports = { createJob, getJobs, deleteJob }