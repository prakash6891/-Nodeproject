const express = require('express');
const app = express();
const path = require('path');
const hbs  = require('hbs');
const port = process.env.PORT || 8000;

//console.log(path.join(__dirname,'../public'));
const static_path = path.join(__dirname,'../public');
const template_path = path.join(__dirname,'../template/views');
const partial_path = path.join(__dirname,'../template/partials');

//set view engine
app.set('view engine', 'hbs');
app.set('views',template_path)
hbs.registerPartials(partial_path);

app.use(express.static(static_path));

app.get('/',(req,res)=>{
    res.render('index');

})

/* set about page router */
app.get('/about',(req,res)=>{
    res.render('about');

})


/* set weather page router */
app.get('/weather',(req,res)=>{
    res.render('weather');

})


// set error page routing
app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg : "Opps! page not found ! please click here",
    });

})


app.listen(port,()=>{
    console.log('server starting at port '+ port );
})