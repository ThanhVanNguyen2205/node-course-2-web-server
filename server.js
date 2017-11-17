const hbs = require('hbs');
const express= require('express');
const fs=require('fs');
const port=process.env.PORT ||3000;

let app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');

//create a log for server
app.use((req,res,next)=>{
   let timeStamp=new Date().toString();
   let log=`${timeStamp}: ${req.method} ${req.url}`;
   console.log(log);
   fs.writeFileSync("server.log",log+'\n');
   next();
})
//maintanace page
// app.use((req,res,next)=>{
//     res.render('maintanance.hbs');
// });
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'This is a welcome message'
    })
});



app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });

})


app.listen(port,()=>{
    'server is up on port' +port;
});