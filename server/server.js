const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Note} = require('./models/notes')

let app = express()
app.use(bodyParser.json())

app.get('/',(req,res)=>{

    Note.find().countDocuments().then((result)=>{

        num= result;
        return Note.find()
    }).then((result)=>{
        res.send({
            num,
            result
        })
    })
})

app.post('/create',(req,res)=>{

    note = new Note({
        title: req.body.title,
        body: req.body.body
    })
    note.save().then((result)=>{
        res.send(result)
    },(err)=>{
        res.status(404)
    })
})

app.delete('/delete/:id',(req,res)=>{

    let id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(400).send()
    }
    Note.find().findOneAndDelete({
        _id: new ObjectID(id)
    }).then(result=>{
        if(!result){
            res.status(404).send()
        }
        res.send(result)
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.listen(3000,()=>{
    console.log('Server is up on 3000');
})