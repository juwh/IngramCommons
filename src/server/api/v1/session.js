/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let Joi = require('joi');

module.exports = app => {

    /*
     * Log a user in
     *
     * @param {req.body.username} Username of user trying to log in
     * @param {req.body.password} Password of user trying to log in
     * @return { 200, {username, primary_email} }
     */
    app.post('/v1/session', (req, res) => {
        let User = app.models.User;
        let username = req.body.username;
        let password = req.body.password;

        if (!username) {
            return res.status(400).send({error: `"username" is required`});
        }
        if (!password) {
            return res.status(400).send({error: `"password" is required`});
        }

        User.findOne({ username: username }, (err, user) => {
            if (user) {
                if (user.authenticate(password)) {
                    req.session.username = username;
                    return res.status(200).send({
                        username: username,
                        primary_email: user.primary_email
                    });
                } else {
                    return res.status(401).send({error: `unauthorized`});
                }
            } else {
                return res.status(401).send({error: `unauthorized`});
            }
        });
    });

    /*
     * Log a user out
     *
     * @return { 204 if was logged in, 200 if no user in session }
     */
    app.delete('/v1/session', (req, res) => {
        if (req.session.username) {
            req.session.destroy();
            res.status(204).send();
        } else {
            res.status(200).send();
        }
    });

};
