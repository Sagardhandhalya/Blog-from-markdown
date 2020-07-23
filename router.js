const express = require('express')
const Article = require('./model/article')
const router = express.Router()



router.get('/new',(req,res)=>{
    res.render("articles/new",{article:new Article()});
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/');
    res.render("articles/edit", { article });

})



router.get('/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id);
   if(article == null) res.redirect('/');
    res.render("articles/show",{article});
})




router.post('/', async (req,res)=>{
            let article = new Article(
                {
                        title : req.body.title,
                        descreption : req.body.descreption,
                        markdown:req.body.markdown,

                }
            );
    try { 
        article = await article.save();
        res.redirect(`/articles/${article.id}`)

    }
    catch(e){

        res.render('/articles/new',{article})
        
    }
            


})

router.put('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
  
            article.title = req.body.title;
            article.descreption =req.body.descreption;
            article.markdown= req.body.markdown;

        
    
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`)

    } 
    catch (e) {

        res.render('articles/new', { article })

    }



})


router.delete('/:id',async(req,res) =>{
    //const article = await Article.findByIdAndDelete(req.params.id);
    
    res.redirect('/article');
})

module.exports = router;