const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const passport = require('passport');
const path = require('path')
const cookieSession = require('cookie-session');
const async = require('async');
const db = require('./database');
const ms = require('./mail');
require("./passport-setup");
require('dotenv').config()

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

const app = express();

//////////////////////////////////////////// cors specs //////////////////////////////////////////////
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

//////////////////////////////////////////// middleware //////////////////////////////////////////////

app.use(cors(corsOpts));

app.use(bodyparser.json())

app.use(cookieSession({
    name: 'session',
    keys: ["key-1", "key-2"],
}))

app.use(passport.initialize())
app.use(passport.session())


/////////////////////////////////////////// cloudinary //////////////////////////////////////////////

cloudinary.config({

    cloud_name: "dgnzhe33t",

    api_key: "944153474649289",

    api_secret: "M6aLps_uViacnjMCiRMMTj2QBQM",

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'jiraclone',
            public_id: file.fieldname + '-' + req.params.project_id
        }
    },
});

var upload = multer({ storage: storage });


////////////////////////////////////////////////////////////// Authentication && Authorization //////////////////////////////////////////////////////////////

////////////////////////////////// middleware for authorization of API calls

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next()
    }
    else {
        res.redirect('/')
    }
}

////////////////////////////////// authenticate user

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

////////////////////////////////// authorize user

app.get("/authorize/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.getProjectDetails(req.params.project_id)

    if(result !== null){
        let members = result.members
        let userId = req.user.id
    
        let isMember = members.findIndex(member => member.user_id === userId) >= 0 ? true : false
    
        if (isMember) {
            res.json({ authorize: true })
        }
        else {
            res.json({ authorize: false })
        }
    }
    else{
        res.json({ authorize: false })
    }

})


////////////////////////////////////////////////////////////// OAUTH ///////////////////////////////////////////////////////////////////////

const redirectURL = (req,res,next) => {
    console.log("Params",req.params)
    req.session.redirectTo = req.params.redirectTo
    next()
}

//////////////////////////////////////////////////////// OAuth using google

app.get('/googleauth/:redirectTo', redirectURL,passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.

        let result = await db.findUser(req.user.id)
        if (result) {
            res.redirect(req.session.redirectTo);
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await db.insertUser(userDocument);

            console.log("inserted", result)

            if (result)
                res.redirect('/Projects');
        }
    })


/////////////////////////////////////////////////////////////// OAuth using Microsoft

app.get('/microsoftauth/:redirectTo', redirectURL, passport.authenticate('microsoft'));

app.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.
        let result = await db.findUser(req.user.id)
        if (result) {
            console.log("exists", result)
            res.redirect(req.session.redirectTo);
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await db.insertUser(userDocument);

            console.log("inserted", result)

            if (result)
                res.redirect('/Projects');
        }
    }
);


//////////////////////////////////////////////////////////////////////// OAUTH using Github

app.get('/githubauth/:redirectTo', redirectURL, passport.authenticate('github', { scope: ['user:email'] }));

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    async function (req, res) {
        // Successful authentication, redirect home.
        let result = await db.findUser(req.user.id)
        if (result) {
            console.log("exists", result)
            res.redirect(req.session.redirectTo);
        }
        else {
            let userDocument = {
                id: req.user.id,
                email: req.user?.emails?.[0]?.value || null,
                name: req.user.displayName,
                img: req.user?.photos?.[0]?.value || null
            }

            const result = await db.insertUser(userDocument);

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

////////////////////////////////////////////////////////// DB operations ///////////////////////////////////////////////////////////

//////////////////////////////////////////////////////// Get User Detail 

app.get("/getDetails", isLoggedIn, async (req, res) => {

    try {
        let result = await db.findUser(req.user.id)

        const ownerNameWords = result.name.split(" ");

        let ownerDummyImg = ''

        for (var i = 0; i < ownerNameWords.length; i++) {
            ownerNameWords[i] = ownerNameWords[i].charAt(0).toUpperCase() + ownerNameWords[i].slice(1);
            ownerDummyImg += ownerNameWords[i].charAt(0).toUpperCase()
        }

        ownerName = ownerNameWords.join(" ")

        result.name = ownerName
        result.dummy_img = ownerDummyImg

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
    const { projects } = await db.findUser(req.user.id)

    let projectsList = []
    async.each(projects, async (project_id, done) => {
        let project = await db.getProjectDetails(project_id)
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
    const { projects } = await db.findUser(req.user.id)

    let projectsMembers = []
    async.each(projects, async (project_id, done) => {
        let project = await db.getProjectDetails(project_id)

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
    const { projects } = await db.findUser(req.user.id)
    console.log(projects)
    if (projects.length > 0) {
        let work = []
        async.each(projects, async (project_id, done) => {
            let project = await db.getProjectDetails(project_id)
            console.log(project)
            work.push({
                project_id: project.project_id,
                project_name: project.project_name,
                icon: project.icon,
                issues: project.Issues.filter((issue) => issue.assignee.user_id === req.user.id),
                modifiedAt: project.modifiedAt
            })
        },
            function (er) {
                res.json({ data: work })
            })
    }
    else
        res.json({ data: null })
})

//////////////////////////////////////////////////////////////////// Get Basic details of selected project for side navbar

app.get("/getBasicprojectDetails/:project_id", isLoggedIn, async (req, res) => {
    let project = await db.getProjectDetails(req.params.project_id)
    let result = {
        project_id: project.project_id,
        project_name: project.project_name,
        project_key: project.project_key,
        owner: project.owner,
        createdAt: project.createdAt,
        icon: project.icon,
        code: project.code,
        isOwner: req.user.id === project.owner.user_id
    }
    res.json({ data: result })
})


//////////////////////////////////////////////////////////////////// Get details of selected project for project board

app.get("/getProjectDetails/:project_id", isLoggedIn, async (req, res) => {
    let project = await db.getProjectDetails(req.params.project_id)

    if (project) {
        let result = {
            project_id: project.project_id,
            project_name: project.project_name,
            project_key: project.project_key,
            createdAt: project.createdAt,
            board: project.Board.columns,
            icon: project.icon,
            invited: project.invited,
            modifiedAt: project.modifiedAt,
            isOwner: req.user.id === project.owner.user_id,
            owner: project.owner,
            members: project.members,
            Sprint: project.Sprint,
            Issues: project.Issues,
            code: project.code,
            backlog:project.backlog,
            invited: project.invited
        }
        res.json({ data: result })
    }
    else
        res.json({ data: null })

})

//////////////////////////////////////////////////////////////////// Get Members' details of selected project

app.get("/getMembersDetails/:project_id", isLoggedIn, async (req, res) => {
    let project = await db.getProjectDetails(req.params.project_id)
    let details = {
        project_id: project.project_id,
        project_name: project.project_name,
        owner: project.owner,
        members: project.members,
        isOwner: req.user.id === project.owner.user_id,
    }
    res.json({ data: details })
})


//////////////////////////////////////////////////////////////////// Create a New project

app.post("/createProject", isLoggedIn, async (req, res) => {

    let userDetails = await db.findUser(req.user.id)

    const ownerNameWords = userDetails.name.split(" ");

    let ownerDummyImg = ''

    for (var i = 0; i < ownerNameWords.length; i++) {
        ownerNameWords[i] = ownerNameWords[i].charAt(0).toUpperCase() + ownerNameWords[i].slice(1);
        ownerDummyImg += ownerNameWords[i].charAt(0).toUpperCase()
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
            img: userDetails.displayPicture,
            dummy_img: ownerDummyImg,
            email: userDetails.email
        },
        members: [
            {
                user_id: userDetails.user_id,
                name: ownerName,
                img: userDetails.displayPicture,
                dummy_img: ownerDummyImg,
                email: userDetails.email
            }
        ],
        Sprint: null,
        Issues: [],
        Board: {
            columns: ["to do", "in progress", "done"],
        },
        icon: '../../assets/project-dummy-logo.svg',
        code: {},
        invited: [],
        modifiedAt: + new Date(),
        backlog:[]
    }

    let result = await db.createProject(project)

    if (result.insertedId) {
        let result2 = await db.updateUserProjects(req.user.id, project.project_id)

        if (result2.modifiedCount) {
            res.json({ status: "success" })
        }
    }


})

////////////////////////////////////////////////////////////////// Inserting user into invited list of a project

app.post("/inviteUser", isLoggedIn, async (req, res) => {
    let project_id = req.body.project.project_id
    let project_name = req.body.project.project_name
    let { name } = await db.findUser(req.user.id)
    let mails = req.body.mails

    ms.invite(project_id, project_name, name, mails)

    let result = await db.inviteUser(project_id, mails)

    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

////////////////////////////////////////////////////////////////// Updating basic project details

app.put("/updateProjectDetails/:project_id", isLoggedIn, upload.single("projectIcon"), async (req, res) => {
    let projectDetails = JSON.parse(req.body.projectDetails)
    let projectIcon = req.file.path
    let project_id = projectDetails.project_id
    let project_name = projectDetails.project_name
    let project_key = projectDetails.project_key

    let result = await db.updateProjectDetails(project_id, project_name, project_key, projectIcon)

    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})



////////////////////////////////////////////////////////////////// Updating an issue of a specific project

app.put("/updateIssue/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.replaceIssue(req.params.project_id, req.body.issue)
    let result2 = await db.replaceIssueInSprint(req.params.project_id,req.body.issue)
    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
})

////////////////////////////////////////////////////////////////// Updating board of a specific project

app.put("/updateBoard/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.updateBoard(req.params.project_id, req.body.board)
    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

////////////////////////////////////////////////////////////////// Updating sprint of a specific project

app.put("/updateSprint/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.updateSprint(req.params.project_id, req.body.sprint)
    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

///////////////////////////////////////////////////////////////// Updating backlog of a specific project

app.put("/updateBacklog/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.updateBacklog(req.params.project_id, req.body.backlog)
    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
});

///////////////////////////////////////////////////////////////// Updating Issues of a specific project

app.put("/updateIssues/:project_id", isLoggedIn, async (req, res) => {
    let result = await db.updateIssues(req.params.project_id, req.body.Issues)
    if (result.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

////////////////////////////////////////////////////////////////// Updating members of a specific project

app.put("/acceptInvite/:project_id", isLoggedIn, async (req, res) => {
    // remove user email from invited list
    let result = await db.removeInvitedUser(req.params.project_id, req.body.email)

    // add user details to project members list
    let result2 = await db.addMember(req.params.project_id, req.body)

    // add project id to user projects list
    let result3 = await db.addProject(req.body.user_id, req.params.project_id)

    if (result.modifiedCount && result2.modifiedCount && result3.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

////////////////////////////////////////////////////////////////// Removing a member from a project

app.delete("/removeMember/:project_id/:user_id", isLoggedIn, async (req, res) => {

    let { project_name } = await db.getProjectDetails(req.params.project_id)

    let user = await db.findUser(req.params.user_id);

    let result = await db.removeMemberFromProject(req.params.project_id, req.params.user_id)

    let result2 = await db.removeProjectFromUser(req.params.user_id, req.params.project_id)

    if (result.modifiedCount && result2.modifiedCount) {
        ms.revoke(project_name, user.email);
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })
})

////////////////////////////////////////////////////////////////// Deleteing a Issue in a Project

app.delete("/deleteIssue/:project_id/:issue_id/:sprint_id", isLoggedIn, async (req, res) => {
    console.log(req.params.project_id, req.params.issue_id)

    let result = await db.deleteIssueFromProject(req.params.project_id, req.params.issue_id)

    let result2 = await db.deleteIssueFromSprint(req.params.project_id, req.params.issue_id, req.params.sprint_id)

    if (result.modifiedCount && result2.modifiedCount) {
        res.json({ status: "success" })
    }
    else
        res.json({ status: "failure" })

})

//////////////////////////////////////////////////////////////////  Deleting a Project

app.delete("/deleteProject/:project_id", isLoggedIn, async (req, res) => {

    let result = await db.deleteProject(req.params.project_id)

    let result2 = await db.deleteProjectFromUser(req.user.id, req.params.project_id)

    if (result.deletedCount > 0 && result2)
        res.json({ status: "success" })

})


///////////////////////////////////////////////////////////////// Hosting Angular and Express Server /////////////////////////////////////////////////



app.use(express.static(path.join(__dirname, 'dist/jira-clone')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jira-clone/index.html"))
})

app.listen(process.env.PORT || 4500, () => {
    console.log('Server is running on port 4500');
})

