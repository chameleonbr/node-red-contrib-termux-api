var child_process = require('child_process');

const VOID = function (res) {
  return true;
}
const OBJ = function (res) {
  return JSON.parse(res);
}
const STR = function (res) {
  return res.substr(0,res.length-1);
}


const execTermux = function (cmd, opts, parser) {

  if (opts === undefined) {
    var opts = [];
  }

  if (parser === undefined) {
    var parser = OBJ;
  }
  return new Promise(function (resolve, reject) {
    child_process.execFile(cmd, opts, function (err, out, code) {
      try{
        var res = parser(out);
        if (typeof res === 'object' && res.error !== undefined) {
          reject(res.error);
        }else{
          resolve(res);
        }
      }catch(e){
        console.log('Termux Error:',out);
        reject(e);
      }
    });
  })
};

module.exports = {
  VOID: VOID,
  STR: STR,
  OBJ: OBJ,
  exec: execTermux
};
