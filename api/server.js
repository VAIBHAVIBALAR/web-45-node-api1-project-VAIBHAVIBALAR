// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) =>{
    const newUser = req.body
    users.insert(newUser)
    .then(user => {
        if((user.name !== undefined && user.bio !==  undefined) && (user.name !== null && user.bio !== null) && (user.name !== "" && user.bio !== "")){
          res.status(201).json(user)
        }else{
            res.status(400).json({message: 'Please provide name and bio for the user'})
        }
    })
    .catch(err =>{
        res.status(500).json({ message: err.message})
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

server.delete('/api/users/:id', (req, res) =>{
    users.remove(req.params.id)
    .then(user  =>{
        if(user){
            res.status(200).json(user)
        }else {
            res.status(404).json({
                message: 'The user with the specified id does not exist'
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message: 'The user with the specified ID could not be removed'
        })
    })
})

server.put('/api/users/:id', async (req, res) =>{
 const { id } = req.params
 const info = req.body
  try {
     const result = await users.update(id, info)
     if(!result){
        res.status(404).json({ message: 'The user with the specified ID does not exist'})
    }
     else if((info.name == undefined || info.bio ==  undefined) || (info.name == null || info.bio == null) || (info.name == "" || info.bio == "")){
        res.status(400).json({message: 'Please provide name and bio for the user'})
     }else{
          res.status(200).json(result)
      }
 } catch (err) {
     res.status(500).json({message: 'The user information could not be modified'})
 }
})
module.exports = server; // EXPORT YOUR SERVER instead of {}