const mongoose = require('mongoose')
const {JSDOM} = require('jsdom')
const marked = require('marked')
const createdompurify = require('dompurify')
const purify = createdompurify(new JSDOM().window)

const Article = new mongoose.Schema(
    {
        title:{
            type:String,
            required : true
        },
        descreption:{
            type: String 
        },
        markdown: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default:Date.now,
        },
        sanitizedhtml :{
            type:String,
            required:true
        }

        
       
        
    }
)
Article.pre('validate',function(next)
{
    if(this.markdown)
    {
        this.sanitizedhtml = purify.sanitize(marked(this.markdown));
        
      
        
    }
    next()
})

module.exports = mongoose.model('Article',Article);