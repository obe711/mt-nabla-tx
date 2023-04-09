const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');
const config = require("./config/config");
const logger = require("./config/logger")


const message = Buffer.from('Some bytes');

function createClient() {

  const client = dgram.createSocket('udp4');

  client.on("message", (mes, rinfo) => {
    logger.info(`client got: ${mes} from ${rinfo.address}:${rinfo.port}`, mes);
  });


  client.on("error", (e) => {
    logger.error(`onError ${e.code}`);
    if (e.code === 'ECONNREFUSED') {
      logger.error('Nabla Server is down');
    }
  });

  //console.log(config.nablaPort)

  // client.connect(config.nablaPort, config.nablaIp, (err) => {
  //   if (err) {
  //     logger.error(`onConnect - ${err}`);

  //   }

  //   client.send(message, (err) => {
  //     if (err) {
  //       logger.error(`onSend - ${err}`);
  //     }
  //   });
  // });

  return client
}



const testObj = {
  url: "httpsfskjfhksdh",
  someNumber: 3345,
  moreText: "stsdfsdfs"
}

function sendNablaTx() {
  const clientSender = createClient();
  clientSender(JSON.stringify({
    url: "httpsfskjfhksdh",
    someNumber: 3345,
    moreText: "stsdfsdfs"
  }));
}

sendNablaTx();

module.exports = {
  testObj,
  sendNablaTx
}










// let inputbuffer = "";
// process.stdin.on("data", function (data) {
//   inputbuffer += data;
//   if (inputbuffer.indexOf("\n") !== -1) {
//     const line = inputbuffer.substring(0, inputbuffer.indexOf("\n"));
//     inputbuffer = inputbuffer.substring(inputbuffer.indexOf("\n") + 1);
//     // Let the client escape
//     if (line === 'exit') { return cleanup(); }
//     if (line === 'quit') { return cleanup(); }
//     client.send(line);
//     sendNablaTx();
//   }
// });

// class NablaClient {
//   constructor() {
//     this.client = createClient();
//   }

//   sendToNabla(data) {
//     console.log("DATA", this.client)
//     // this.client.send(JSON.stringify(data), (err) => {
//     //   console.log(er)
//     // })
//   }
// }

// module.exports = new NablaClient();