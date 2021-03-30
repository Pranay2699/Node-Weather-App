//-------------------------------------------- 
//If nodemon is used changes are automaticaly reflected
//---------------------------------------------

//Node JS path module will get things working---Path manipulation and stuff--->(((Core Module)))
const path = require('path')
const express = require('express')
const { dirname } = require('path')
const hbs = require('hbs')
const { send } = require('process')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const e = require('express')
//----------------------------------
//To get HTML page to render in node we need to give the complete path from root folder  
//----------------------------------

//To get the directory name
// console.log(__dirname)
// //To get the filename
// console.log(__filename)
// //.. to go up a folder
// console.log(path.join(__dirname,'../public'))

// Creating an express appliation
// As of now doesn't take any arguments
const app = express()
const port = process.env.PORT || 3000

//Path for different folders
const static_path = path.join(__dirname,'../public')
const views_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

//Like base.html
//Handle bars Templete rendering
//Render dynamic docs
app.set('view engine', 'hbs') //Setting up the view engine
app.set('views', views_path)
hbs.registerPartials(partials_path)

//To serve the static folder we do the following
app.use(express.static(static_path))





// Below is similar to route in flask and path in django
//It takes in two arguments
//Route and function-->to get to know what function does once it visits that url.
//Function takes in two arguments
//object-->Containing information to incoming server
//Response-->various responce messages are possible

//index.html directly goes into root link toget itself run
//Passing HTML
//This is never served and it can be removed becaue root 'url' is served by index.html
// app.get('', (req,res)=>{
//     res.send("<h1>Hello Express</h1>")
// })


//Passing JSON
//Object sent as JSON
//Arrays can also be used here can be stringified
//These pages can be directly accessed via localhost:3000/help.html and so on...
// app.get('/help', (req,res)=>{
//     res.send({
//         name:"Klaus",
//         age:"1000 years"
//     })
// })

// app.get('/about', (req,res)=>{
//     res.send("<h1>About Page</h1>")
// })

app.get('',(req,res)=>{
    //Name of templates in views
    //Passing parameter into that hbs file
    res.render('index',{
        title:"Weather App",
        name:"Klaus Michaelson"
    })
}
)

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Developer"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        message:"For help, Contact us via number +91 xxxxx xxx34",
        title:"Help Page",
        name:"Elijah Michaelson"
    })
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        })
    }

    const add=req.query.address

    geocode.geocode(add,(err,resp1)=>{
        if (err){
            return res.send({
                error:"Error from geocode part"
            })
        }
        
        data=resp1
        forecast.forecast(data,(err,resp2)=>{
            if (err){
                return res.send({
                    error:"Error from forecast part"
                })
            }
        
            return res.send({
                address:add,
                forecast:resp2
            })
        })
        
    })


    // res.send({
    //     forecast:"It is snowing",
    //     location:"Hyderabad",
    //     address:req.query.address        
    // })
})

app.get('/help/*',(req,res)=>{
    res.render("error",{
        message:'Help article not found',
        title:'Error Page',
        name:'Rebekha'
    })
})


// Should always come at the end
app.get('*',(req,res)=>{
    res.render("error",{
        message:'Page not found',
        title:'Error Page',
        name:'Rebekha'
    })
})

// //Testing out querying
// //Getting to know about the query string when query url is entered
// //Query string is passed as following: http://127.0.0.1:3000/products?search=games&rating=5
// app.get('/products',(req,res)=>{
//     //To get information from query string we do the following
//     //req.query contains query key value pair
//     console.log(req.query) 
//     console.log(req.query.search) 
    
//     //Creating a sitution to restrictively use the query search
//     if (!req.query.search) {
//         return res.send({
//             error:"You must provide a search term"
//         })
//     }

//     res.send({
//         products:[]
//     })
// }
// ) 


//To start the Sever.
//It listens on specific port
// Server is up via asynchronous process
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})
