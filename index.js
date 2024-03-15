
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const nodemailer = require("nodemailer");
const connectDb = require('./dbConfig')
dotenv.config()
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const superUserRouter = require('./routes/superUserRoutes')
const jobsRouter = require('./routes/jobsRoute')
const trainingRouter = require('./routes/trainingRoute')
const cookieParser = require('cookie-parser')

// DB config
connectDb()

// middlewares

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(express.json())
app.use(cookieParser())

// User
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.USEREMAIL,
        pass: process.env.USERAPP,
    },
});

// routes

app.use('/', userRouter)
app.use('/', blogRouter)
app.use('/', superUserRouter)
app.use('/', jobsRouter)
app.use('/',trainingRouter)

// Message from User

app.get('/',(req,res)=>{
    res.json({message:true})
})

app.get('/api/v1/check',(req,res)=>{
    res.json({message:"Success",success:true})
})

app.post('/userMessage', async (req, res) => {
    const { fName, lName, email, message } = req.body
    console.log('backend user message : ', req.body)
    if (!lName) {
        req.body.lName = ''
    }
    try {
        const info = await transporter.sendMail({
            from: email, // sender address
            to: "info@techealerz.com", // list of receivers
            subject: "Message from Techealerz user", // Subject line
            text: `
            ${fName} ${lName},
            ${message}`, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });
        return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }

})



app.listen(8000, () => {
    console.log(`Server is running on port 8000`)
})
