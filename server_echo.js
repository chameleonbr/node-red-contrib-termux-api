const WebSocket = require('ws');
var termux = require('./exec_termux');

var base64url = require('base64url');

const wss = new WebSocket.Server({
  host: 'localhost',
  port: 9999
});

var node = {
  send: function(data){
    console.log('received',data);
  }
}

wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(msgstr) {
        let message = JSON.parse(msgstr);
        let button = message.button;
        let msgEncoded = message.msg;
        let msg = msgEncoded;

        var called = false;
        if(button !== undefined){
          switch (button) {
            case 'action':
              node.send([msg,null,null,null]);
              called = true;
              break;
            case 'button1':
              node.send([null,msg,null,null]);
              called = true;
              break;
            case 'button2':
              node.send([null,null,msg,null]);
              called = true;
              break;
            case 'button3':
              node.send([null,null,null,msg]);
              called = true;
              break;
          }
      }
      });
    });
