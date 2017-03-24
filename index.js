module.exports = function(RED) {
    "use strict";

    var termux = require('./exec_termux');

    var fs = require('fs');

    function BatteryStatus(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-battery-status').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-battery-status", BatteryStatus);


    function CameraInfo(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-camera-info').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-camera-info", CameraInfo);

    function ClipboardGet(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-clipboard-get').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-clipboard-get", ClipboardGet);

    function ContactList(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-contact-list').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-contact-list", ContactList);


    function Cellinfo(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-telephony-cellinfo').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-telephony-cellinfo", Cellinfo);

    function Devinfo(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-telephony-deviceinfo').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-telephony-deviceinfo", Devinfo);

    function TTSEngines(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-tts-engines').then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-tts-engines", TTSEngines);

    function CameraPhoto(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.cameraid = n.cameraid;
        var node = this;
        var photoFile = '/data/data/com.termux/files/home/tmp_photo.jpg';

        node.on('input', function(msg) {
          termux.exec('termux-camera-photo',['-c',node.cameraid,photoFile], termux.VOID).then(function(){
            fs.readFile(photoFile, (err, data) => {
              if (err) throw err;
              msg.payload = data;
              node.send(msg);
              fs.unlink(photoFile);
            });
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-camera-photo", CameraPhoto);


    function ClipboardSet(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        var node = this;

        node.on('input', function(msg) {
          termux.exec('termux-clipboard-set',[msg.payload],termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-clipboard-set", ClipboardSet);


    function Dialog(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.hint = n.hint;
        this.textarea = n.textarea;
        this.password = n.password;
        this.title = n.title;

        var node = this;

        node.on('input', function(msg) {

          let hint = (!!msg.hint)?(msg.hint):(node.hint);
          let title = (!!msg.title)?(msg.title):(node.title);

          var opts = [];

          if(!!title){
            opts.push('-t',title);
          }
          if(!!hint){
            opts.push('-i',hint);
          }

          if(node.textarea){
            opts.push('-m');
          }
          if(node.password){
            opts.push('-p');
          }

          termux.exec('termux-dialog',opts,termux.STR).then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-dialog", Dialog);

    function Download(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.description = n.description;
        this.title = n.title;
        this.url = n.url;
        var node = this;


        node.on('input', function(msg) {
          let description = (!!msg.description)?(msg.description):(node.description);
          let title = (!!msg.title)?(msg.title):(node.title);
          let url = (!!msg.url)?(msg.url):(node.url);
          var opts = [];

          if(!!description){
            opts.push('-d',description);
          }
          if(!!title){
            opts.push('-t',title);
          }
          opts.push(url);

          termux.exec('termux-download',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-download", Download);


    function Location(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.provider = n.provider;
        this.request = n.request;

        var node = this;

        node.on('input', function(msg) {
          var opts = [];

          let provider = (node.provider)?(node.provider):('gps');
          let request = (!!node.request)?(node.request):('once');

          opts.push('-p',provider);
          opts.push('-r',request);

          termux.exec('termux-location',opts).then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-location", Location);

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


    function TTSSpeak(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.engine = n.engine;
        this.language = n.language;
        this.pitch = n.pitch;
        this.rate = n.rate;
        this.stream = n.stream;
        this.text = n.text;
        var node = this;

        node.on('input', function(msg) {

          let engine = (!!msg.engine)?(msg.engine):(node.engine);
          let language = (!!msg.language)?(msg.language):(node.language);
          let pitch = (!!msg.pitch)?(msg.pitch):(node.pitch);
          let rate = (!!msg.rate)?(msg.rate):(node.rate);
          let stream = (!!msg.stream)?(msg.stream):(node.stream);
          let text = (!!msg.payload)?(msg.payload):(node.text);
          var opts = [];

          if(!!engine){
            opts.push('-e',engine);
          }

          if(!!language){
            opts.push('-l',language);
          }

          if(!!pitch){
            opts.push('-p',pitch);
          }

          if(!!rate){
            opts.push('-r',rate);
          }

          if(!!stream){
            opts.push('-s',stream.toUpperCase());
          }

          opts.push(text);

          termux.exec('termux-tts-speak',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-tts-speak", TTSSpeak);


    function Vibrate(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.force = n.force;
        this.duration = n.duration;
        var node = this;

        node.on('input', function(msg) {

          let force = (!!msg.force)?(msg.force):(node.force);
          let duration = (!!msg.duration)?(msg.duration):(node.duration);
          var opts = [];

          if(!!force){
            opts.push('-f')
          }

          if(!!duration){
            opts.push('-d',duration)
          }

          termux.exec('termux-vibrate',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-vibrate", Vibrate);

    function Toast(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.short = n.short;
        var node = this;

        node.on('input', function(msg) {

          let short = (!!msg.short)?(msg.short):(node.short);
          var opts = [];

          if(!!short){
            opts.push('-s');
          }

          opts.push(msg.payload);

          termux.exec('termux-toast',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-toast", Toast);


    function SMSInbox(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.dates = n.dates;
        this.numbers = n.numbers;
        this.limit = n.limit;
        this.offset = n.offset;
        var node = this;

        node.on('input', function(msg) {

          let dates = (!!msg.dates)?(msg.dates):(node.dates);
          let numbers = (!!msg.numbers)?(msg.numbers):(node.numbers);
          let limit = (!!msg.limit)?(msg.limit):(node.limit);
          let offset = (!!msg.offset)?(msg.offset):(node.offset);
          var opts = [];

          if(!!dates){
            opts.push('-d');
          }

          if(!!numbers){
            opts.push('-n');
          }

          if(!!limit){
            opts.push('-l',limit);
          }

          if(!!offset){
            opts.push('-o',offset);
          }

          termux.exec('termux-sms-inbox',opts).then(function(data){
            msg.payload = data;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-sms-inbox", SMSInbox);

    function SMSSend(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.numbers = n.numbers;
        var node = this;

        node.on('input', function(msg) {
          let numbers = (!!msg.numbers)?(msg.numbers):(node.numbers);
          var opts = [];

          if(!!numbers){
            opts.push('-n',numbers);
          }
          opts.push(msg.payload);

          termux.exec('termux-sms-send',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-sms-send", SMSSend);


    function Share(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.topic = n.topic;
        this.action = n.action;
        this.contenttype = n.contenttype;
        this.default = n.default;
        this.title = n.title;
        var node = this;


        node.on('input', function(msg) {
          let action = (!!msg.action)?(msg.action):(node.action);
          let contenttype = (!!msg.contenttype)?(msg.contenttype):(node.contenttype);
          let def = (!!msg.default)?(msg.default):(node.default);
          let title = (!!msg.title)?(msg.title):(node.title);
          var opts = [];

          if(!!action){
            opts.push('-a',action);
          }
          if(!!contenttype){
            opts.push('-c',contenttype);
          }
          if(!!def){
            opts.push('-d');
          }
          if(!!title){
            opts.push('-t',title);
          }

          opts.push(msg.payload);

          termux.exec('termux-share',opts,termux.VOID).then(function(){
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-share", Share);

};
