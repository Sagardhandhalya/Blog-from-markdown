const express = require('express')
const app = express();
const Article = require('./model/article')
const mongoose = require('mongoose')
const methodOverrider = require('method-override')
const articleRouter = require("./router.js")


app.set('view engine','ejs');
app.use(methodOverrider('_method'))
mongoose.connect('mongodb://localhost/blog',
    { useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({extended:false}))


app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    });
    res.render("articles/index",{articles});
});
app.use('/articles', articleRouter)
const port = process.env.port || 3000;
app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
})