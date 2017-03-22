module.exports = function(RED) {
    "use strict";
    var api = require("termux-api").default;
    var fs = require('fs');

    function BatteryStatus(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().batteryStatus().build().run();
          res.getOutputObject().then(function(status) {
            msg.payload = status;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-battery-status", BatteryStatus);


    function CameraInfo(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().cameraInfo().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-camera-info", CameraInfo);

    function ClipboardGet(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().clipboardGet().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-clipboard-set", ClipboardGet);

    function ContactList(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().contactList().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-contact-list", ContactList);


    function Cellinfo(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().telephonyCellInfo().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-telephony-cellinfo", Cellinfo);

    function Devinfo(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().telephonyDeviceInfo().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-telephony-deviceinfo", Devinfo);

    function TTSEngines(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().ttsEngines().build().run();
          res.getOutputObject().then(function(info) {
            msg.payload = info;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-tts-engines", TTSEngines);

    function CameraPhoto(n) {
        RED.nodes.createNode(this, n);
        this.cameraid = n.cameraid;
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let photoFile = '/data/data/com.termux/files/home/tmp_photo.jpg';
          let res = api.createCommand().cameraPhoto().
          setOutputFile(photoFile).setCamera(node.cameraid)
          .build().run();
          res.getOutputObject().then(function() {
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
        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {
          let res = api.createCommand().clipboardSet(msg.payload).build().run();
          res.getOutputObject().then(function() {
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-clipboard-set", ClipboardSet);


    function Dialog(n) {
        RED.nodes.createNode(this, n);
        this.hint = n.hint;
        this.textarea = n.textarea;
        this.password = n.password;
        this.title = n.title;

        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {

          let res = api.createCommand().dialog();
          let hint = (!!msg.hint)?(msg.hint):(node.hint);
          let title = (!!msg.title)?(msg.title):(node.title);

          if(!!node.title){
            res = res.setTitle(node.title);
          }
          if(!!node.hint){
            res = res.setHint(node.hint);
          }

          if(node.textarea){
            res = res.setMultiline();
          }
          if(node.password){
            res = res.setTypePassword();
          }

          res.build().run();
          res.getOutputObject().then(function(text) {
            msg.payload = text;
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-dialog", Dialog);




    function Download(n) {
        RED.nodes.createNode(this, n);
        this.description = n.description;
        this.title = n.title;
        this.url = n.url;

        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {

          let description = (!!msg.hint)?(msg.description):(node.description);
          let title = (!!msg.title)?(msg.title):(node.title);
          let url = (!!msg.url)?(msg.url):(node.url);

          let res = api.createCommand().download(url);

          if(!!node.title){
            res = res.setTitle(node.title);
          }
          if(!!node.description){
            res = res.setDescription(node.description);
          }

          res.build().run();
          res.getOutputObject().then(function() {
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-download", Download);


    function Location(n) {
        RED.nodes.createNode(this, n);
        this.provider = n.provider;
        this.request = n.request;

        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {

          let res = api.createCommand().location();

          switch (node.provider) {
            case 'gps':
              res = res.fromGPSProvider();
              break;
            case 'network':
              res = res.fromNetworkProvider();
              break;
            case 'network':
              res = res.fromPassiveProvider();
              break;
            default:
              break;
          }

          switch (node.request) {
            case 'last':
              res = res.requestLast();
              break;
            case 'once':
              res = res.requestOnce();
              break;
            case 'updates':
              res = res.requestUpdates();
              break;
            default:
              break;
          }

          res.build().run();
          res.getOutputObject().then(function(data) {
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
        this.content = n.content;
        this.id = n.id;
        this.title = n.title;
        this.url = n.url;

        var node = this;
        node.client.on('error', function(err) {
            if (err) {
                node.error(err);
            }
        });
        node.on('input', function(msg) {

          let res = api.createCommand().notification();

          let content = (!!msg.content)?(msg.content):(node.content);
          let id = (!!msg.id)?(msg.id):(node.id);
          let title = (!!msg.title)?(msg.title):(node.title);
          let url = (!!msg.url)?(msg.url):(node.url);

          if(!!node.content){
            res = res.setContent(node.content);
          }

          if(!!node.id){
            res = res.setId(node.id);
          }

          if(!!node.title){
            res = res.setTitle(node.title);
          }

          if(!!node.url){
            res = res.setUrl(node.url);
          }

          res.build().run();
          res.getOutputObject().then(function() {
            node.send(msg);
          }).catch(function(err){
            node.error(err);
          });
        });
    }

    RED.nodes.registerType("termux-notification", Notification);
};
