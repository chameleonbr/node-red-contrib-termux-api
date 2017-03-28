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

    var dnode = require('dnode');

    var base64url = require('base64url');

    var server = dnode({
      call : function ( button, msgEncoded, cb) {
        let msg = base64url.decode(msgEncoded);
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

          cb(called);
        }
      }
    });
    server.listen(9999);


    function Notification(n) {
      RED.nodes.createNode(this, n);

      this.name = n.name;
      this.topic = n.topic;
      this.content = n.content;
      this.title = n.title;

      this.action = n.action;
      this.actionclose = n.actionclose;

      this.button1 = n.button1;
      this.button1close = n.button1close;

      this.button2 = n.button2;
      this.button2close = n.button2close;

      this.button3 = n.button3;
      this.button3close = n.button3close;

      //this.ledcolor = n.ledcolor; // color of the blinking led as RRGGBB (default: none)
      //this.ledon = n.ledon; // number of milliseconds for the LED to be on while it's flashing (default: 800)
      //this.ledoff = n.ledoff; // number of milliseconds for the LED to be off while it's flashing (default: 800)

      this.sound  = n.sound; // play a sound with the notification

      this.priority = n.priority; // notification priority (high/low/max/min/default)

      this.vibrate  = n.vibrate; // vibrate pattern, comma separated as in 500,1000,200

      var node = this;

      node.on('input', function(msg) {

        let content = (!!msg.payload)?(msg.payload):(node.content);
        let title = (!!msg.title)?(msg.title):(node.title);

        var opts = [];

        if(!!content){
          opts.push('--content',content);
        }

        if(!!id){
          opts.push('--id',msg._msgid);
        }

        if(!!title){
          opts.push('--title',title);
        }

        const nodeTermuxCall = 'node ~/.node-red/node_modules/node-red-contrib-termux-api/red_termux.js';

        const closeCmd = 'termux-notification-remove '+msg._msgid;

        if(!!node.action){
          let actionClose = (node.actionclose)?(closeCmd):('');
          let actionCmd = nodeTermuxCall+' action "'+base64url.encode(msg) + '";' + actionClose;
          opts.push('--action',actionCmd);
        }

        if(!!node.button1){
          let button1Close = (node.button1close)?(closeCmd):('');
          let button1Cmd = nodeTermuxCall+' button1 "'+base64url.encode(msg) + '";' + button1Close;
          opts.push('--button1',button1);
          opts.push('--button1-action',button1Cmd);
        }

        if(!!node.button2){
          let button2Close = (node.button2close)?(closeCmd):('');
          let button2Cmd = nodeTermuxCall+' button2 "'+base64url.encode(msg) + '";' + button2Close;
          opts.push('--button2',button2);
          opts.push('--button2-action',button2Cmd);
        }

        if(!!node.button3){
          let button3Close = (node.button3close)?(closeCmd):('');
          let button3Cmd = nodeTermuxCall+' button3 "'+base64url.encode(msg) + '";' + button3Close;
          opts.push('--button3',button3);
          opts.push('--button3-action',button3Cmd);
        }
/*
        if(!!node.led_color){
          opts.push('--led-color',node.led_color);
          if(!!node.led_on){
            opts.push('--led-on',node.led_on);
          }
          if(!!node.led_off){
            opts.push('--led-off',node.led_off);
          }
        }
*/
        if(!!node.priority){
          opts.push('--priority',node.priority);
        }

        if(!!node.sound){
          opts.push('--sound');
        }

        if(!!node.vibrate){
          opts.push('--vibrate',node.vibrate);
        }

        termux.exec('termux-notification',opts,termux.VOID).catch(function(err){
          node.error(err);
        });
      });
    }
    RED.nodes.registerType("termux-notification", Notification);
};
