const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/reviewapp'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


const Review = require('./review')

app.use(express.json())

app.use('/review',Review)

var x = 0
var count = 0

/*app.get('/', async(req,res) => {
    try{
           const reviews = await Review.find()
           res.write(review)
           
    }catch(err){
        res.send('Error ' + err)
    }
})*/
app.get('/', async(req,res) => {
    let reviews = []
reviews.push("average rating : " + x/count)
    for (let i = 1; i <= 5; i++) {
    reviews.push(await Review.find({stars: i.toString()}))
}

res.json(reviews)    
    
    
  /*  
    const reviews5 =   await Review.find({stars : "5"})
           res.write(await Review.find({stars : "5"}))
        //const reviews4 =   Review.find({stars : "4"})
           res.write(Review.find({stars : "4"}))
        //const reviews3 =   Review.find({stars : "3"})
           res.write(Review.find({stars : "3"}))
        //const reviews2 =   Review.find({stars : "2"})
           res.write(Review.find({stars : "2"}))
        //const reviews1 =   Review.find({stars : "1"})
           res.write(Review.find({stars : "1"}))
        
        res.end()*/
})
/*
app.get('/:4', async(req,res) => {
    try{
           const reviews =   await Review.find({stars : "4"})
           res.json(reviews)
    }catch(err){
        res.send('Error ' + err)
    }
})


app.get('/:3', async(req,res) => {
    try{
           const reviews =   await Review.find({stars : "3"})
           res.json(reviews)
               }catch(err){
        res.send('Error ' + err)
    }
})

*/

app.get('/:id', async(req,res) => {
    try{
           const reviews =   await Review.find({stars : req.params.id})
           res.json(reviews)
    }catch(err){
        res.send('Error ' + err)
    }
})


/*app.get('/:1', async(req,res) => {
    try{
           const reviews =   await Review.find({stars : "1"})
           res.json(reviews)
           }catch(err){
        res.send('Error ' + err)
    }
})*/



app.get('/:id', async(req,res) => {
    try{
           const reviews = await Review.findById(req.params.id)
           res.json(reviews)
    }catch(err){
        res.send('Error ' + err)
    }
})

app.post('/', async(req,res) => {
    count++
    const reviews = new Review({
        username: req.body.username,
        stars : req.body.stars,
        description:req.body.description

    })
    x += parseFloat(reviews.stars)
    

    try{
        const a1 =  await reviews.save() 
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})


app.delete('/:id',async(req,res)=>{
    try{
        const reviews = await Review.findByIdAndDelete(req.params.id) 
       
        res.json(reviews)   
    }catch(err){
        res.send('Error')
    }
})

app.listen(5000, () => {
    console.log('Server started')
})

