if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {console.log('service worker registered', reg)})
    .catch((err) => {console.log('service worker not registered', err)});
}

//window.addEventListener('beforeinstallprompt', (e) => {
////  // Prevent Chrome 67 and earlier from automatically showing the prompt
////  e.preventDefault();
////  // Stash the event so it can be triggered later.
////  deferredPrompt = e;
//  console.log('Event beforeinstallprompt');
//  e.prompt();
//});






























































// NOTES

// Making a server. But now I use liveserver. 
// I found that it is easiest to use express as explained by the new boston if I make everything. But maybe I'll just use live-server for now. 
/*const http = require("http");
const fs = require('fs');

const hostname = "127.0.0.1";
const port = 3000;

// 404 response
function send404Response(response) {
    response.statusCode = 404;
    response.setHeader("Content-type", "text/plain");
    response.write("Error 404: Page not found");
    response.end();
}

// Handle request
const server = http.createServer((request, response) => {
    if( request.method == 'GET' && request.url == '/' ){
        response.writeHead(200, {"Content-type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }
    else {
        send404Response(response); 
    }
    
    //response.statusCode = 200;
    //response.setHeader("Content-type", "text/plain");
    //response.end("Hello World");
});

// Start listening
server.listen(port, hostname, () => {
    console.log("Server started on port " + port);
});*/




// Tried express, but it used a template engine and viewers. 
/*const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("Hello World")
});
 
app.listen(port, function() {
    console.log("Server started on port " + port);
});*/

