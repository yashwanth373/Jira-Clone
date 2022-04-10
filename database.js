const { MongoClient } = require('mongodb');
require('dotenv').config()

const dburl = process.env.DB_URL;

const client = new MongoClient(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));


async function insertUser(user) {

    const document = {
        user_id: user.id,
        email: user.email,
        name: user.name,
        projects: [],
        displayPicture: user.img,
    }

    return client.db('JIRAClone').collection('users').insertOne(document);



}

function findUser(user_id) {

    return client.db('JIRAClone').collection('users').findOne({ user_id: user_id })
}


function getProjectDetails(project_id) {
    return client.db('JIRAClone').collection('projects').findOne({ project_id: project_id })
}

function createProject(project) {
    return client.db('JIRAClone').collection('projects').insertOne(project)
}

function updateUserProjects(user_id, project_id) {
    return client.db('JIRAClone').collection('users').updateOne({ user_id: user_id }, { $push: { projects: project_id } })
}

function deleteProject(project_id) {
    return client.db('JIRAClone').collection('projects').deleteOne({ project_id: project_id })
}

function deleteProjectFromUser(user_id, project_id) {
    return client.db('JIRAClone').collection('users').updateOne({ user_id: user_id }, { $pull: { projects: project_id } })
}

function replaceIssue(project_id, issue) {
    return client.db('JIRAClone').collection('projects').findOneAndUpdate({ project_id: project_id, 'Issues.issue_id': issue.issue_id }, { $set: { 'Issues.$': issue } })

}

module.exports = {
    insertUser,
    findUser,
    getProjectDetails,
    deleteProject,
    deleteProjectFromUser,
    createProject,
    updateUserProjects,
    replaceIssue
}