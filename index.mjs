import express from 'express';
import path from 'path';



// importing Routers 
import apiV1Router from './apiV1/index.mjs'


const app = express();
const __dirname = path.resolve();
app.use(express.json()); // body parser

app.use('/api/v1', apiV1Router);
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on Port:${PORT}`);
})

