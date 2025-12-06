const express = require("express");
const dotenv=require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors');
const connectDB = require("./config/db");

dotenv.config()


connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))

const PORT =process.env.PORT || 8080;

app.use('/api/v1/test' , require("./routes/testRouters"))
app.use('/api/v1/auth' ,require('./routes/authRouter'))
app.use('/api/v1/inventory' , require('./routes/inventoryRouter'))
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use("/api/v1/admin", require("./routes/adminRoutes"));


app.listen(PORT , ()=>console.log(`Node Server Running in ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`.bgBlue.white));




