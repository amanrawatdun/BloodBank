const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log(`connect to mongodb database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`mongodb Database Error ${error}`.bgRed.white)
    }
}
module.exports=connectDB