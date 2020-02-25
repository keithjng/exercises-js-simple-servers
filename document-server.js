let net = require('net');

let serverLog = require('./lib/serverLog');

const fs = require('fs');

let SERVER_PORT = 2004;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  let files = fs.readdirSync('/Users/Keith/Desktop/CompSci/exercises-js-simple-servers/files/', 'utf-8');
  connection.write(files.toString());
  connection.write('\n')

  connection.write('Type in the name of the file you want to see: ');

  serverLog('CONNECT', `Client at ${clientAddress} connected`);

  connection.on('data', function(clientData) {
    let cutEnd = clientData.slice(0, -1);
    let text = fs.readFileSync(`files/${cutEnd}`, 'utf-8');
    connection.write(text);
});

connection.on('end', function() {
  serverLog('DISCONNET', `Client ${clientAddress} disconnected`);
});
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `Document server listening on port ${SERVER_PORT}`);
});
