const {MongoClient} = require('mongodb');
require('dotenv').config()

const dburl = process.env.DB_URL;

const client = new MongoClient(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));


async function insertUser(user){

    const document = {
        user_id: user.id,
        email: user.email,
        name: user.name,
        projects: [],
        displayPicture: user.img,
    }

   return client.db('JIRAClone').collection('users').insertOne(document);



}

function findUser(user_id){

    return client.db('JIRAClone').collection('users').findOne({user_id: user_id})
}

module.exports = {
    insertUser,
    findUser
}