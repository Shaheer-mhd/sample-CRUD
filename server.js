const express = require('express')
const {getDbConnection, getCollection} = require('./dbConnect')
const {ObjectId} = require('mongodb')

// Server config
const app = express()
const port = 3002

app.use(express.json())

getDbConnection()

app.get('/getAllData', async (req, res) => {
    try {
        console.log("REQUEST INITIATED SUCCESSFULLY");
        
        const collection = await getCollection()
        const data = await collection.find().toArray()
        res.status(200).json(data)
    } catch (error) {
        console.log("ERROR WHILE FETCHING DATA ", error);
        
    }
})

app.post('/createUser', async (req, res) => {
    try {
        console.log("REQUEST INITIATED FOR CREATE A NEW USER");

        let data = req.body
        
        const collection = await getCollection()
        const result = await collection.insertOne(data)
        console.log(result.insertedId);
         
        
        res.status(200).json({message:'Success', result: result.insertedId})
    } catch (error) {
        console.log("ERROR WHILE CREATING USER", error);
        
    }
})

app.post('/updateUser', async (req, res) => {
    try {
        console.log("REQUEST INITIATED FOR USER UPDATION");
        
        let data = req.body
        let {name, ...updationData} = data
        console.log("ID IS ======== > ", name);
        console.log("UPDATION DATA =========== > ", updationData);
        
        const collection = await getCollection()
        const result = await collection.updateOne({name:name}, {$set: updationData})
        console.log(result);
        

        res.status(200).json({message: "updation success"})

    } catch (error) {
        console.log("ERROR IN UPDATION ", error);
        
    }
})

app.post('/deleteUser/:id', async (req, res) => {
    try {
        console.log("REQUEST INITIATED FOR DELETION OF DATA");
        
        let id = req.params.id
        const collection = await getCollection()
        const result = await collection.deleteOne(
            {
                _id:new ObjectId(id)
            }
        )

        console.log(result);
        res.status(200).json({message:"Deletion Success"})

    } catch (error) {
        console.log("ERROR WHILE DELETING ",error);
        
    }
})

app.get('/', async (req, res) => {
    try {
        console.log("REQUEST INITIATED TO BASE URL");
        res.send("Helllo World !!!!!!! ")
    } catch (error) {
        console.log(error);
        
    }
})


app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})