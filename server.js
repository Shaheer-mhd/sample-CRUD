const express = require('express')

// Server config
const app = express()
const port = 3002

app.use(express.json())

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