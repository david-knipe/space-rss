'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const _ = require('lodash');

const readFeed = require('./read-feed.js');
const htmlPage = fs.readFileSync(__dirname + '/public/index.html');
const myScript = fs.readFileSync(__dirname + '/public/index.js');

const server = http.createServer((request, response) => {
    const requestedUrl = url.parse(request.url).path;
    if (requestedUrl === '/') {
        response.write(htmlPage);
        response.end();
    } else if (requestedUrl === '/index.js') {
        response.write(myScript);
        response.end();
    } else if (requestedUrl === '/recentStories') {
        readFeed.getRecent((err, res) => {
            if (err) {
                response.writeHead(500);
                response.end();
            } else {
                response.write(JSON.stringify(res));
                response.end();
            }
        });
    } else {
        response.writeHead(400);
        response.end();
    }
});

server.listen(12345, '127.0.0.1');
