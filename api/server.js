// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) =>{
    const newUser = req.body
    users.insert(newUser)
    .then(user => {
        if(user){
          res.status(201).json(user)
        }else {
            res.status(400).json({
                message: 'Please provide name and bio for the user',
            })
        }
    })
    .catch(err =>{
        res.status(500).json({ message: 'There was an error while saving the user to the database'})
    })
})

server.get('/api/users', (req, res)=>{
    users.find()
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: err.message})
    })
} )

server.get('/api/users/:id', (req, res)=>{
    users.findById(req.params.id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
