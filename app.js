const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');

const connectDB=require('./config/db');
const {errorHandler}=require('./middleware/errorMiddleware');

const authRoutes=require('./routes/authRoutes');
const prodRoutes=require('./routes/prodRoutes');
const factureRoute=require('./routes/factureRoute');
const saleHistory=require('./routes/HistoryRoute');
const stat=require('./routes/stateRoute')

const corsOption={
    origin:'http://localhost:3000/',
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}

connectDB();

app
    .use(cors({corsOption}))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(express.json())
    .use('/auth',authRoutes)
    .use('/prod',prodRoutes)
    .use('/sell',factureRoute)
    .use('/history',saleHistory)
    .use('/stat',stat)
    .use(express.static(path.join(__dirname,'public')))
    .use(errorHandler)



app.get('/',(req,res)=>{
    res.send('hello');
})


app.use(({res})=>{
    const message='ERROR 404 NOT FOUND';
    res.status(404).json({message});
})

const port=8000;
app.listen(port,()=>console.log(`http:localhost:${port}`));