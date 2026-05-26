const Turn = require('node-turn');

const server = new Turn({
  listeningPort: 3478,
  listeningIps: ['0.0.0.0'],
  relayIps: ['0.0.0.0'],
  externalIps: {
    default: '5.42.217.134'
  },
  minPort: 49160,
  maxPort: 65000,
  maxAllocateLifetime: 86400,
  defaultAllocatetLifetime: 3600,
  defaultAllocateLifetime: 3600,
  authMech: 'long-term',
  credentials: {
    'meetazi': 'Aazizi123'
  },
  realm: 'turn.theazizi.ir',
  debugLevel: 'INFO'
});

server.start();

console.log('TURN server started');
console.log('Listening on UDP 3478');
console.log('Relay UDP range 49160-65000');
console.log('Realm: turn.theazizi.ir');


