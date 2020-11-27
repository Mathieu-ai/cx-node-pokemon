const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const fs = require('fs')
const fileName = './pokedex-27112020.json'


var pokedex;
fs.readFile(fileName, 'utf8' , (err, data) => {
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
  //return response.send(pokedex);
});

app.get("/pokemon/:id", function(request, response) {

  const result = pokedex.filter(pokm => pokm.id == request.params.id);
  return response.send(result)
  //return response.send("<html> <body> <h1> Bonjour </h1> </body>");
});

app.post('/items', (req, res) => {
  
  /*const result = pokedex.filter(pokm => pokm.id == request.params.id);
  let maxId = (accumulator, pokm) => pokm.id > accumulator ? pokm.id : accumulator;
  maxId = maxId +1
  */  
  pokedex.push(req.body);
  fs.writeFileSync(fileName, JSON.stringify(pokedex, null, 5), 'utf-8');
  res.json(req.body);
})

app.delete("/items/:id", function(req, res) {
  
  const result = pokedex.filter(pokm => pokm.id != req.params.id);
  let ok = result.length != pokedex.length
  if (ok) {
    pokedex = result
    fs.writeFileSync(fileName, JSON.stringify(pokedex, null, 5), 'utf-8');
  }
  
  return res.send(ok)
})


app.listen(3000, function() {
    console.log(
        "The server has started on port 3000"
    );
});

