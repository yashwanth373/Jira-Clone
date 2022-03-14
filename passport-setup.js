const passport = require('passport');


const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "278083628606-nnqga1mvagkdnhbih8k256ogtb68o899.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4500/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));



const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.use(new MicrosoftStrategy({
    clientID: '9810bfa8-0a6a-458e-9b39-fdf27460aac8',
    clientSecret: 'ZKX7Q~MbA_9jULJ09VbFqdgUR1iYb6IqMW8dh',
    callbackURL: "http://localhost:4500/microsoft/callback",
    scope: ['user.read']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null,profile)
    }
));