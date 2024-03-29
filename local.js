/*--------------------------------------------------
|Author: Ronan Rodrigues
|Objective: Front-end for Smartcomerci application
|Contact: +55 27 996011204
|Mail: ronan.rodrigues@pullup.tech, rounantj@hotmail.com
|___________________________________________________*/

var formidable = require("formidable");
var express = require("express");
var app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var fs = require("fs");
const fs_Promises = require("fs").promises;

// Importando as variaveis de ambiente
require("dotenv").config();
//console.log(process.env)

// If necessary also
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const cors = require("cors");
app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

var startup = require("./routes/startup");
var cms = require("./routes/cms");
startup.all(app);

cms.all(app);

app.use(express.json());
app.use(express.static("public"));

/*
app.listen(3001)
//console.log("app listen in 3000")
*/

var options = {
  key: fs.readFileSync("privatekey.pem"),
  cert: fs.readFileSync("certificate.pem"),
};

const https = require("https");

app.listen(8080);
console.log("server runnin on " + 8080);

// var server = https.createServer(options, app);
// server.listen(443, function() {
//     //console.log("Port "+443);
// });
