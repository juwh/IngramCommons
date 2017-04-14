/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";
let numRes = 0;

function onLoad() {
    let button = document.getElementById('submitBtn');
    button.addEventListener('click', onRegister, false );
}

function onAdd() {
    numRes++;
    $("#residents").append(
        "<br><div class='resident'>" +
            "<div class='container-fluid'>" +
                "<input class='form-control' id='first_name" + numRes + "' name='first_name' type='text' placeholder='First Name'>" +
                "<input class='form-control' id='last_name" + numRes + "' name='last_name' type='text' placeholder='Last Name'>" +
                "<input class='form-control' id='year" + numRes + "' name='year' type='text' placeholder='Year'>" +
                "<input class='form-control' id='major" + numRes + "' name='major' type='text' placeholder='Major'>" +
            "</div>" +
        "</div>");
}

function onRegister(event) {
    event.preventDefault();
    let residents = [];
    for (let i = 1; i <= numRes; i++) {
        let resident = {
            first_name: document.getElementById('first_name' + i).value,
            last_name: document.getElementById('last_name' + i).value,
            year: document.getElementById('year' + i).value,
            major: document.getElementById('major' + i).value,
        };
        residents.push(resident);
    }

    const data = {
        building:           document.getElementById('building').value,
        number:             document.getElementById('number').value,
        type:               document.getElementById('type').value,
        residents:          residents,
        floor:              document.getElementById('floor').value,
        coordinates:       [document.getElementById('lng').value, document.getElementById('lat').value]
    };

    let $error = $('#errorMsg');
    let building = data.building.toLocaleLowerCase();
    let number = data.number.toLocaleLowerCase();
    $.ajax({
        url: `/v1/${building}`,
        method: "post",
        data: data,
        success: function(data) {
            window.location = `/`;
        },
        error: function(err) {
            let errorEl = document.getElementById('errorMsg');
            errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
        }
    });
}