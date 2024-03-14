const mongoose = require('mongoose')

// username  = techealerzsolutions
// password = KZbdTG33iorKPgpH

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGOURI)
        console.log('DB connected sucessfully!')
    }catch(err){
        console.log('Db cannot connected due to : ',err)
    }
}

module.exports = connectDb