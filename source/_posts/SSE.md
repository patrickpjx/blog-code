---
title: SSE
date: 2020-07-29 17:19:56
tags:
  - network
---

###### What

Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via HTTP connection.

Server-Sent Events is a standard describing how servers can initiate data transmission towards clients once an initial client connection has been established. 
They are commonly used to send message updates or continuous data streams to a browser client and designed to enhance native, cross-browser streaming through a JavaScript API called EventSource, through which a client requests a particular URL in order to receive an event stream.


###### How


``````
client

const source = new EventSource('http://localhost:3000/test');

source.addEventListener('open', () => {
  console.log('Connected');
}, false);

source.addEventListener('message', e => {
  console.log(e.data);
}, false);

source.addEventListener('pause', e => {
  source.close();
}, false);

``````


``````
server

var http = require("http");
http.createServer(function (req, res) {
    var fileName = "." + req.url;
    if (fileName === "./stream") {
        res.writeHead(200, {
        "Content-Type":"text/event-stream", 
        "Cache-Control":"no-cache", 
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin": '*',
        });
        res.write("retry: 10000\n");
        res.write("event: connecttime\n");
        res.write("data: " + (new Date()) + "\n\n");
        res.write("data: " + (new Date()) + "\n\n");
        
        interval = setInterval(function() {
            res.write("data: " + (new Date()) + "\n\n");
        }, 1000);
        
        /*
        interval2 = setInterval(function() {
            res.write("event: myevent\n");
            res.write("data: " + (new Date()) + "\n\n");
        }, 2000);
        */
        
        req.connection.addListener("close", function () {
            clearInterval(interval);
           // clearInterval(interval2);
        }, false);
  }
}).listen(80, "127.0.0.1");

``````


###### some special

Apache 

http://httpd.apache.org/docs/2.0/mod/prefork.html


Nodejs 



