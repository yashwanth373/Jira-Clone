const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const passport = require('passport');
const path = require('path')
const cookieSession = require('cookie-session');
const async = require('async');
const { findUser, insertUser, getProjectDetails } = require('./database');
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

app.get("/authenticate", (req, res) => {
    if (req.user) {
        res.json({ authenticate: true })
    }
    else {
        console.log("not logged in")
        res.json({ authenticate: false })
    }
})


//OAuth using google

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


// OAuth using Microsoft

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


// OAUTH using Github

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

//Log out 

app.get("/logout", (req, res) => {
    console.log("logging out")
    req.session = null;
    req.logout();
    res.redirect('/');
})

//middleware for authorization of API calls

const isLoggedIn = (req,res,next) => {
    if(req.user){
        next()
    }
    else{
        res.redirect('/')
    }
}



// DB operations 

app.get("/getDetails",isLoggedIn,  async (req, res) => {

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

app.get("/getProjectsList",isLoggedIn, async (req,res) => {
    const {projects} = await findUser(req.user.id)

    let projectsList = []
    async.each(projects, async (project_id,done) => {
        let project = await getProjectDetails(project_id)

        projectsList.push({
            icon: project.icon,
            name: project.name,
            key: project.key,
            owner_name: project.owner.name,
            owner_img: project.owner.img,
        })
    },
        function (er) {
            res.json({data : projectsList})
        }
    )
    
})



app.use(express.static(path.join(__dirname, 'dist/jira-clone')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jira-clone/index.html"))
})

app.listen(process.env.port || 4500, () => {
    console.log('Server is running on port 4500');
})

