const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const passport = require('passport');
const path = require('path')
const cookieSession = require('cookie-session');
const { findUser, insertUser } = require('./database');
require("./passport-setup");
require("./database");

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

app.get("/getDetails", (req, res) => {
    if (req.user) {
        res.json({ user: req.user })
    }
    else {
        res.json({ user: null })
    }
})


//OAuth using google

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',passport.authenticate('google'),
    async function (req, res) {
        // Successful authentication, redirect home.

        let result = await findUser(req.user.id)
        if (result) {
            console.log("exsists",result)
            res.redirect('/ProjectsDashboard');
        }
        else{
            let userDocument = {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
                img: req.user.photos[0].value
            }

            const result =  await insertUser(userDocument);

            console.log("inserted",result)

            if (result)
                res.redirect('/ProjectsDashboard');
        }
    })


// OAuth using Microsoft

app.get('/microsoft', passport.authenticate('microsoft'));

app.get('/microsoft/callback',
    passport.authenticate('microsoft'),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/ProjectsDashboard');
    });


app.use(express.static(path.join(__dirname, 'dist/jira-clone')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jira-clone/index.html"))
})

app.listen(4500, () => {
    console.log('Server is running on port 4500');
})

