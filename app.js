const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');

const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const {errorHandler}=require('./middleware/errorMiddleware');

app
    .use(morgan('dev'))
    .use(bodyParser.json())



app.get('/',(req,res)=>{
    res.send('hello');
})


app.use(({res})=>{
    const message='ERROR 404 NOT FOUND';
    res.status(404).json({message});
})

const port=8000;
app.listen(port,()=>console.log(`http:localhost:${port}`));