require('dotenv').config();

const express=require('express');
app =express();
port=process.env.PORT||8080;
expressLayouts=require('express-ejs-layouts');

mongoose =require('mongoose');
bodyParser = require('body-parser');



app.use(express.static(__dirname + '/public'));

app.set('view engine','ejs');
app.use(expressLayouts);

mongoose.connect('mongodb://localhost:27017/mydb');


app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./app/routes'));



app.get('/',(req,res)=>{
    res.send('Hello,I am the app')
});

app.listen(port,()=>{
    console.log(`app listining on http://localhost:${port}`)
})