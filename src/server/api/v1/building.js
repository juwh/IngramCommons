/**
 * Created by William on 4/13/2017.
 */
"use strict";

let Joi = require('joi');

module.exports = app => {

    let User = app.models.User;

    /*
     * Create a new user
     *
     * @param {req.body.username} Display name of the new user
     * @param {req.body.first_name} First name of the user - optional
     * @param {req.body.last_name} Last name of the user - optional
     * @param {req.body.city} City user lives in - optional
     * @param {req.body.primary_email} Email address of the user
     * @param {req.body.password} Password for the user
     * @return {201, {username,primary_email}} Return username and others
     */
    app.post('/v1/user', (req, res) => {
        // Schema for user info validation
        let schema = Joi.object().keys({
            username: Joi.string().lowercase().alphanum().min(5).max(16).required(),
            primary_email: Joi.string().lowercase().email().required(),
            first_name: Joi.string().allow(''),
            last_name: Joi.string().allow(''),
            city: Joi.string().default(''),
            password: Joi.string().min(5).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*!|@|#|$|%|^).{9,}$/).required()
        });
        // Validate user input
        Joi.validate(req.body, schema, { stripUnknown: true }, (err, data) => {
            if (req.body.username === 'password') {
                return res.status(400).send({error: 'invalid username'});
            }
            if (err) {
                const message = err.details[0].message;
                return res.status(400).send({ error: message });
            } else {
                // Try to create the user
                let user = new app.models.User(data);
                user.save(err => {
                    if (err) {
                        // Error if username is already in use
                        if (err.code === 11000) {
                            if (err.message.indexOf('username_1') !== -1)
                                return res.status(400).send({error: 'username already in use'});
                            if (err.message.indexOf('primary_email_1') !== -1)
                                return res.status(400).send({error: 'email address already in use'});
                        }
                        // Something else in the username failed
                        else return res.status(400).send({error: 'invalid username'});
                    } else {
                        // Send the happy response back
                        return res.status(201).send({
                            username: data.username,
                            primary_email: data.primary_email
                        });
                    }
                });
            }
        });
    });

    /*
     * Fetch user information
     *
     * @param {req.params.username} Username of the user to query for
     * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
     */
    app.get('/v1/user/:username', (req, res) => {
        User.findOne({ "username" : req.params.username }, (err, user) => {
            if (user) {
                res.status(200).send({
                    username: user.username,
                    primary_email: user.primary_email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    city: user.city,
                    games: user.games
                });
            } else {
                res.status(404).send({error: 'unknown user: ' + req.params.username});
            }
        });
    });

    /*
     * Update a user's profile information
     *
     * @param {req.body.first_name} First name of the user - optional
     * @param {req.body.last_name} Last name of the user - optional
     * @param {req.body.city} City user lives in - optional
     * @return {204, no body content} Return status only
     */
    app.put('/v1/user', (req, res) => {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let city = req.body.city;

        if (req.session.username) {
            User.findOne({ "username" : req.session.username }, (err, user) => {
                if (first_name) {
                    user.first_name = first_name;
                }
                if (last_name) {
                    user.last_name = last_name;
                }
                if (city) {
                    user.city = city;
                }
                return res.status(204).send();
            });
        } else {
            return res.status(401).send({error: 'unauthorized'});
        }

    });
};
