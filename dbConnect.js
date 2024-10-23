const {MongoClient} = require('mongodb')

// db config
const url = 'mongodb://localhost:27017'
const dbName = 'sample'
const collectionName = 'user_details'
let db, collection;

async function getDbConnection() {
    const client = new MongoClient(url)

    try {
        await client.connect()
        console.log("CONNECTED TO DATABASE ");
        
        db = client.db(dbName)
        collection = db.collection(collectionName)

    } catch (error) {
        console.log("ERROR OCCURED >>>>>>>>>>>>>> ", error);
        
    }

}

async function getCollection () {
    if (!collection){
        throw new Error("COLLECTION NOT INITIATED !!!!!!!!!!!! ")
    }
    return collection
}

module.exports = {getDbConnection, getCollection}