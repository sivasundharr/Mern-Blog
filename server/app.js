import express from 'express';
import morgan from 'morgan';
import dotenv  from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser  from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors  from 'cors';
import indexRoutes from './routers/index.js';
import userRoutes from './routers/user.js';
import authRoutes from './routers/auth.js';

dotenv.config({path:'./config/config.env'});

const app = express()

app.use(cors({credentials: true, origin: true}));

const CURRENT_WORKING_DIR = process.cwd()

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use('/dist',express.static(path.join(CURRENT_WORKING_DIR,'dist')))

app.use('/',indexRoutes);
app.use('/api/users',userRoutes);
app.use('/auth',authRoutes);

mongoose.connect(process.env.CONNECTION_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err));

app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({"error":err.name +":"+ err.message})
    }
    else if(err){
        res.status(400).json({"error": err.name +":"+ err.message})
        console.log(err);
    }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log(`server is running in devlopment mode on ${PORT}`));