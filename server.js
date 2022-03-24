const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const passport = require('passport');
const path = require('path')
const cookieSession = require('cookie-session');
const async = require('async');
const { findUser, insertUser, getProjectDetails, deleteProject, deleteProjectFromUser, createProject, updateUserProjects } = require('./database');
require("./passport-setup");
require('dotenv').config()

const app = express();

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));

app.use(bodyparser.json())

app.use(cookieSession({
    name: 'session',
    keys: ["key-1", "key-2"],
}))

app.use(passport.initialize())
app.use(passport.session())

////////////////////////////////////////////////////////////// Authentication //////////////////////////////////////////////////////////////

app.get("/authenticate", (req, res) => {
    if (req.user) {
        console.log(req.user)
        res.json({ authenticate: true })
    }
    else {
        console.log("not logged in")
        res.json({ authenticate: false })
    }
})


////////////////////////////////////////////////////////////// OAUTH ///////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// OAuth using google

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.

        let result = await findUser(req.user.id)
        if (result) {
            console.log("exists", result)
            res.redirect('/Projects');
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await insertUser(userDocument);

            console.log("inserted", result)

            if (result)
                res.redirect('/Projects');
        }
    })


/////////////////////////////////////////////////////////////// OAuth using Microsoft

app.get('/microsoft', passport.authenticate('microsoft'));

app.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.
        let result = await findUser(req.user.id)
        if (result) {
            console.log("exists", result)
            res.redirect('/Projects');
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await insertUser(userDocument);

            console.log("inserted", result)

            if (result)
                res.redirect('/Projects');
        }
    }
);


//////////////////////////////////////////////////////////////////////// OAUTH using Github

app.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.
        let result = await findUser(req.user.id)
        if (result) {
            console.log("exists", result)
            res.redirect('/Projects');
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user?.emails?.[0]?.value || null,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await insertUser(userDocument);

            console.log("inserted", result)

            if (result)
                res.redirect('/Projects');
        }
    }
);

/////////////////////////////////////// Log out ///////////////////////////////////////////////// 

app.get("/logout", (req, res) => {
    console.log("logging out")
    req.session = null;
    req.logout();
    res.redirect('/');
})

////////////////////////////////// middleware for authorization of API calls ////////////////////

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next()
    }
    else {
        res.redirect('/')
    }
}



////////////////////////////////////////////////////////// DB operations ///////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// Get User Detail 

app.get("/getDetails", isLoggedIn, async (req, res) => {

    try {
        let result = await findUser(req.user.id)

        if (result) {
            res.json({ user: result })
        }
        else {
            res.json({ user: null })
        }
    }
    catch (err) {
        console.log(err)
    }

})

//////////////////////////////////////////////////////////// Get All Projects of Logged in User

app.get("/getProjectsList", isLoggedIn, async (req, res) => {
    const { projects } = await findUser(req.user.id)

    let projectsList = []
    async.each(projects, async (project_id, done) => {
        let project = await getProjectDetails(project_id)
        console.log(project)
        let isOwner = req.user.id === project.owner.user_id

        projectsList.push({
            id: project.project_id,
            icon: project.icon,
            name: project.project_name,
            key: project.project_key,
            owner_name: project.owner.name,
            owner_img: project.owner.img,
            owner_id: project.owner.user_id,
            isOwner: isOwner
        })
    },
        function (er) {
            console.log(projectsList)
            res.json({ data: projectsList })
        }
    )

})

/////////////////////////////////////////////////////////// Get project Members  of all projects related to logged in user

app.get("/getProjectsMembers", isLoggedIn, async (req, res) => {
    const { projects } = await findUser(req.user.id)

    let projectsMembers = []
    async.each(projects, async (project_id, done) => {
        let project = await getProjectDetails(project_id)

        for (var i = 0; i < project.members.length; i++) {
            let member = project.members[i]
            projectsMembers.push(member)
        }
    },
        function (er) {
            res.json({ data: projectsMembers })
        }
    )

})


/////////////////////////////////////////////////////////// Get Work related to the logged in user

app.get("/getYourWork", isLoggedIn, async (req, res) => {
    const { projects } = await findUser(req.user.id)

    let work = []
    async.each(projects, async (project_id, done) => {
        let project = await getProjectDetails(project_id)
        work.push({
            project_id: project.project_id,
            project_name: project.project_name,
            icon: project.icon,
            issues: project.Issues.filter((issue) => issue.Assignee == req.user.id),
            modifiedAt: project.modifiedAt
        })
    },
        function (er) {
            res.json({ data: work })
        })
})


//////////////////////////////////////////////////////////////////// Create a New project

app.post("/createProject", isLoggedIn, async (req, res) => {

    let userDetails = await findUser(req.user.id)

    const ownerNameWords = userDetails.name.split(" ");

    for (var i = 0; i < ownerNameWords.length; i++) {
        ownerNameWords[i] = ownerNameWords[i].charAt(0).toUpperCase() + ownerNameWords[i].slice(1);
    }

    ownerName = ownerNameWords.join(" ")

    const project = {
        project_id: (+ new Date()).toString().substring(3) + (req.user.id),
        project_name: req.body.project_name,
        project_key: req.body.project_key,
        createdAt: + new Date(),
        owner: {
            user_id: userDetails.user_id,
            name: ownerName,
            img: userDetails.displayPicture
        },
        members: [],
        Sprint: [],
        Epics: [],
        Issues: [],
        Board: {
            columns: ["To Do", "In Progress", "Done"],
        },
        icon: '../../assets/project-dummy-logo.svg',
        code: {},
        invited: [],
        modifiedAt: + new Date()
    }

    let result = await createProject(project)

    if (result.insertedId) {
        let result2 = await updateUserProjects(req.user.id, project.project_id)

        if (result2.modifiedCount) {
            res.json({ status: "success" })
        }
    }


})

//////////////////////////////////////////////////////////////////  Deleting a Project

app.delete("/deleteProject/:project_id", isLoggedIn, async (req, res) => {

    let result = await deleteProject(req.params.project_id)

    let result2 = await deleteProjectFromUser(req.user.id, req.params.project_id)

    if (result.deletedCount > 0 && result2)
        res.json({ status: "success" })

})


///////////////////////////////////////////////////////////////// Hosting Angular and Express Server /////////////////////////////////////////////////



app.use(express.static(path.join(__dirname, 'dist/jira-clone')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jira-clone/index.html"))
})

app.listen(process.env.port || 4500, () => {
    console.log('Server is running on port 4500');
})

