const express = require('express');
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

dotenv.config();

const app = express();

let server = require("http").createServer(app);

const PORT = process.env.TEST || 9001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listening on port: ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use('/', require('../../Server'));

module.exports = server;