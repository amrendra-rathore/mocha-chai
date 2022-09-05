const configurations = require('./config/configuration');
const Server = require('./Server');

const server = new Server(configurations);
server.bootstrap().run();
