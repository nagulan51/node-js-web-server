//npm i -g nodemon 
// run project npm run start
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//moteur de template
app.set('view engine', 'ejs')

//Middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(session({
secret: 'nagulan123',
resave: false,
saveUninitialized: true,
cookie: {secure: false}
}))

app.use(require('./middlewares/flash'))
//Routes
app.get('/', (request, response) => {
    //console.log(request.session)
    //console.log(request.body)
    let Message = require('./models/message')
    Message.all(function(messages){
        response.render('pages/index', {messages : messages})
    })
})
app.post('/' , (request,response) => {
if(request.body.message === undefined || request.body.message === ''){
    response.render('pages/index', {error: "Vous n'avez pas envoyer de meessage :("})
    request.flash('error', "vous n'avez pas poster de meessage")
    response.redirect('/')
}
else 
{
let Message = require('./models/message')
Message.create(request.body.message, function()
    {
        request.flash('success', "Merci !")
        response.redirect('/')
    })
}

})
app.listen(5151)
