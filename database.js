const {MongoClient} = require('mongodb');

const dburl = 'mongodb+srv://kakashi:Naruto@clusterme.ljagy.mongodb.net/JIRAClone?retryWrites=true&w=majority'

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
        // bgImage: user.bgImg,
        // details : {
        //     role: user.role,
        //     department: user.department,
        //     org_name: user.org_name,
        //     location: user.location
        // }
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