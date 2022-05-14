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

function updateProjectDetails(project_id, project_name, project_key, projectIcon) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $set: { project_name: project_name, project_key: project_key, icon: projectIcon } })
}

function updateBoard(project_id, board) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $set: { 'Board.columns': board } })
}

function updateSprint(project_id, sprint) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $set: { 'Sprint': sprint } })
}

function updateBacklog(project_id, backlog) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $set: { 'backlog': backlog } })
}

function updateIssues(project_id,Issues){
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $set: { 'Issues': Issues } })
}

function deleteIssueFromProject(project_id, issue_id) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $pull: { 'Issues': { issue_id: issue_id } } })
}

function deleteIssueFromSprint(project_id, issue_id, sprint_id) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id, 'Sprint.sprint_id': sprint_id }, { $pull: { 'Sprint.$.issues': issue_id } })
}

function removeMemberFromProject(project_id, user_id) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $pull: { 'members': { user_id: user_id } } })
}

function removeProjectFromUser(user_id, project_id) {
    return client.db('JIRAClone').collection('users').updateOne({ user_id: user_id }, { $pull: { projects: project_id } })
}

function inviteUser(project_id, mails) {
    return client.db('JIRAClone').collection('projects').updateOne({ project_id: project_id }, { $push: { 'invited': { $each: mails } } })
}

module.exports = {
    insertUser,
    findUser,
    getProjectDetails,
    deleteProject,
    deleteProjectFromUser,
    createProject,
    updateUserProjects,
    replaceIssue,
    deleteIssueFromProject,
    deleteIssueFromSprint,
    updateBoard,
    updateSprint,
    updateBacklog,
    removeMemberFromProject,
    removeProjectFromUser,
    inviteUser,
    updateProjectDetails,
    updateIssues,
}