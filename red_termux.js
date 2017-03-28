var dnode = require('dnode');

const cmd = process.argv[2]; // command
const msg = process.argv[3]; // msg

var d = dnode.connect(9999);
d.on('remote', function (remote) {
    remote.call(cmd,msg, function (s) {
        d.end();
    });
});
