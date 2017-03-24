var termux = require('./exec_termux');

termux.exec('termux-telephony-deviceinfo').then(function(data){
  console.log(data);
}).catch(function(err){
  node.error(err);
});
