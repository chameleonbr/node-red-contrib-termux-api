const WebSocket = require('ws');
var termux = require('./exec_termux');

const nid = process.argv[2]; // command
const cmd = process.argv[3]; // command
const msg = process.argv[4]; // msg

const ws = new WebSocket('ws://localhost:9999');

ws.on('open', function open() {

  let message = {
    "nid":nid,
    "button":cmd,
    "msg":msg
  };
  ws.send(JSON.stringify(message));
  ws.close();
});

ws.on('error',function(err){
  termux.exec('termux-toast',['Unable to connect'],termux.VOID);
});
