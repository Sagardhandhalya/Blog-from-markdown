const express = require('express')
const app = express();

const mongoose = require('mongoose')
const methodOverrider = require('method-override')
const bcrypt = require('bcrypt')

const key = require('./config/key')
const articleRouter = require("./router.js")


const User = require('./model/user')
const Article = require('./model/article')


app.set('view engine','ejs');
app.use(methodOverrider('_method'))
mongoose.connect(key.URI,
    { useNewUrlParser: true, useUnifiedTopology: true}).catch(err => { console.log(err); });
app.use(express.urlencoded({extended:false}))


app.post('/login', async (req, res) => {
  
    console.log(req.body);
        const cuser = await User.findOne({username:req.body.username});

        if(cuser == null)
        {
            res.redirect('/');
        }
        else{
            await bcrypt.compare(req.body.password,cuser.password, function (err, result) {
                if (result) {
                    res.redirect('/article');
                }
                else {
                    res.redirect('/');
                }
            });
        }


    
});

app.post('/signup', async (req, res) => {
  
     
       try{
       const anyuser = await User.findOne({username : req.body.username});
       if(anyuser == null) 
       {
           await bcrypt.genSalt(5, function (err, salt) {
               bcrypt.hash(req.body.password, salt,async function (err, hash) {
                   const user = new User(
                       {
                           username: req.body.username,
                           email: req.body.email,
                           password: hash

                       });
                   const currentuser = await user.save();
                   console.log(currentuser);
                   res.redirect('/');

               });
           });
       
       }
       else{

           res.redirect('/register');

       }
        
    }
    catch{
        res.redirect('/register');
        

    }
   
   


});


app.get('/', async (req, res) => {
   
    res.render('login');

});

app.get('/register', async (req, res) => {

 
    
    res.render('signup');

});
app.get('/article', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    });
    res.render("articles/index",{articles});
});
app.use('/articles', articleRouter)
const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
})