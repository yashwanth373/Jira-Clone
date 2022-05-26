const nodemailer = require('nodemailer');
require('dotenv').config()

//////////////////////////////////////////// mailing specs //////////////////////////////////////////////

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify().then(console.log).catch(console.error);

///////////////////////////////////////// helper functions to send mails ////////////////////////////////

function invite(project_id, project_name, inviter, mails) {

    const message = "<h2>Hi</h2> <h3>You have been invited to join the project <b>" + project_name + "</b> by " + inviter + "</h3> <h3>Please click on the link below to accept the invitation</h3> <a href='https://simple-jira.herokuapp.com/Projects/invitation/" + project_id + "'>Accept Invitation</a>";

    transporter.sendMail({
        from: '"Jira Clone Support" <jiraclone@gmail.com>', // sender address
        to: mails, // list of receivers
        subject: "Project Invitation for " + project_name, // Subject line
        html: message, // html body
    }).then(info => {
        console.log({ info });
    }).catch(console.error);
}

function revoke(project_name, mail) {
    const message = "<h4>Sorry to see you go</h4> <h6>Your access has been revoked from " + project_name + "</h6> <h6>Please contact the project owner, if this is a mistake</h6>";

    transporter.sendMail({
        from: '"Jira Clone Support" <jiraclone@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: "Access revoked for " + project_name, // Subject line
        html: message, // html body
    }).then(info => {
        console.log({ info });
    }).catch(console.error);
}

function alert() {

}


module.exports = {
    invite,
    revoke,
    alert,
};