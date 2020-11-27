const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const fs = require('fs')

var file;
fs.readFile('./pokedex-27112020.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  file=JSON.parse(data)
  //console.log(JSON.stringify(file))
})

app.use(bodyParser.json())

// create a route for a GET request to '/' - when that route is reached, run a function
app.get("/", function(request, response) {

    return response.send("Hello World !");
});

app.get("/pokemon", function(request, response) {

  return response.send(JSON.stringify(file, null, 5));
});

app.get("/pokemon/:id", function(request, response) {

  return response.send("<html> <body> <h1> Bonjour </h1> </body>");
});




app.listen(3000, function() {
    console.log(
        "The server has started on port 3000"
    );
});

