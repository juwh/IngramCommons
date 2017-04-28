/**
 * Created by William on 4/13/2017.
 */
"use strict";

let Joi = require('joi');

module.exports = app => {

    let Room = app.models.Room;

    /*
     * Add a new room
     */
    app.post('/v1/:building', (req, res) => {
        let data = req.body;
        console.log(data);
        let room = new app.models.Room(data);
        console.log(room);
        room.save(err => {
            if (err) {
                return res.status(400).send({error: 'error saving room'});
            } else {
                // Send the happy response back
                return res.status(201).send({
                    building: data.building,
                    number: data.number,
                    type: data.type
                });
            }
        });
    });

    /*
     * Fetch room information
     *
     * @param {req.params.building} Building of the room to query for
     * @param {req.params.room} Room of the person to query for
     */
    app.get('/v1/:building/:room', (req, res) => {
        Room
            .findOne({ 'building' : req.params.building, 'number' : req.params.room })
            .populate('residents')
            .exec((err, room) => {
                if (room) {
                    res.status(200).send({
                        building: room.building,
                        number: room.number,
                        type: room.type,
                        residents: room.residents,
                        floor: room.floor,
                        coordinates: room.coordinates
                    });
                } else {
                    res.status(404).send({error: 'unknown room: ' + req.params.building});
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
