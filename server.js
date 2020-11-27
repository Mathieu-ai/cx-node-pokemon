const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const fs = require('fs')


var pokedex;
fs.readFile('./pokedex-27112020.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  pokedex=JSON.parse(data)
  //console.log(JSON.stringify(pokedex))
})

app.use(bodyParser.json())

// create a route for a GET request to '/' - when that route is reached, run a function
app.get("/", function(request, response) {

    return response.send("Hello World !");
});

app.get("/pokemon", function(request, response) {

  return response.send(JSON.stringify(pokedex, null, 5));
});

app.get("/pokemon/:id", function(request, response) {

  const result = pokedex.filter(pokm => pokm.id == request.params.id);
  return response.send(result)
  //return response.send("<html> <body> <h1> Bonjour </h1> </body>");
});

app.post('/items', (req, res) => {
  const item = {
      id: pokedex.id + 1,
      name: req.body.name,
      type: req.body.type
  }
  pokedex.push(item);
  res.json(item);
})


app.listen(3000, function() {
    console.log(
        "The server has started on port 3000"
    );
});

