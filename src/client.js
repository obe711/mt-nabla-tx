
const dgram = require('node:dgram');
const config = require("./config/config");
const logger = require("./config/logger")


const client = dgram.createSocket('udp4');


client.on("message", (mes, rinfo) => {
  logger.info(`server got: ${mes} from ${rinfo.address}:${rinfo.port}`);
});

client.on("error", (e) => {
  logger.error(`onError ${e.code}`);
  if (e.code === 'ECONNREFUSED') {
    logger.error('Server is down');
  }
});

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    let message = data;

    if (typeof data === "object") {
      message = JSON.stringify(data);
    }

    client.send(message, config.nablaPort, config.nablaIp, (err) => {
      if (err) {
        logger.error(err);
        reject(`NABLA ERROR (${config.nablaIp}:${config.nablaPort}): ${message}`);
      }
      resolve(`NABLA: (${config.nablaIp}:${config.nablaPort}): ${message}`);
    })
  })
}