module.exports = function(RED) {
  "use strict";

  var termux = require('./exec_termux');
  var dnode = require('dnode');


  var nActions = {};

  var server = dnode({
    call : function (node, button, cb) {
      if(nActions[node] !== undefined && nActions[node][button]){
        nActions[node][button]();
        cb();
      }
    }
});


  function Notification(n) {
    RED.nodes.createNode(this, n);
    this.name = n.name;
    this.topic = n.topic;
    this.content = n.content;
    this.nid = n.nid;
    this.title = n.title;
    this.url = n.url;

    var node = this;

    node.on('input', function(msg) {

      let content = (!!msg.payload)?(msg.payload):(node.content);
      let id = (!!msg.notification_id)?(msg.notification_id):(node.nid);
      let title = (!!msg.title)?(msg.title):(node.title);
      let url = (!!msg.url)?(msg.url):(node.url);
      var opts = [];

      if(!!content){
        opts.push('-c',content);
      }

      if(!!id){
        opts.push('-i',id);
      }

      if(!!title){
        opts.push('-t',title);
      }

      if(!!url){
        opts.push('-u',url);
      }

      termux.exec('termux-notification',opts,termux.VOID).then(function(){
        node.send(msg);
      }).catch(function(err){
        node.error(err);
      });
    });
  }
  RED.nodes.registerType("termux-notification", Notification);
}
