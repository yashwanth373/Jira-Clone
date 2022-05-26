const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// GOOGLE OAUTH

const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://simple-jira.herokuapp.com/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));



// MICROSOFT OAUTH

const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "https://simple-jira.herokuapp.com/microsoft/callback",
    scope: ['user.read']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
));


// GITHUB OAUTH

const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://simple-jira.herokuapp.com/github/callback",
    scope: ['user:email'],
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
));