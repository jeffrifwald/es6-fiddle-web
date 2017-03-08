const path = require('path');
const express = require('express');

module.exports = app => {
    app.use('/', express.static(`${path.resolve("./")}/dist`));
    
    // This one is matching '/xyz/' NOT -> '/xyz/sdf'
    app.get(/^\/\w+\/$/, (req, res) => {
        res.sendFile(`${path.resolve("./")}/dist/index.html`);
    });

    app.get(/^\/embed\/\w+\/$/, (req, res) => {
        res.sendFile(`${path.resolve("./")}/dist/embed.html`);
    });

    // This one is matching '/xyz' NOT -> '/xyz/'
    app.get(/^\/\w+$/, (req, res) => {
        res.redirect(`${req.url}/`);
    });

    app.get(/^\/embed\/\w+$/, (req, res) => {
        res.redirect(`${req.url}/`);
    });
}