import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import axios from 'axios';

const app=express();
const port=3000;

const db= new pg.Client

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});