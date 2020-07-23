const mongoos = require('mongoose')
const user = mongoos.Schema({
    username : {
        type  : String
    },
    email :{
        email  : String
    },
    password:{
        type : String
    }
})

module.exports = mongoos.model('user' ,user);