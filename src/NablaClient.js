const dgram = require('node:dgram');
const config = require("./config/config");
const logger = require("./config/logger")
const DevNull = require("./DevNull");



function createSocketClient() {
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

  return client;
};


class NablaClient {
  constructor(options = {}) {
    this.logger = options.logger || new DevNull();
    this.ip = options.ip || config.nablaIp;
    this.port = options.port || config.nablaPort;
    this.client = createSocketClient();
  }

  clientSend(data) {
    let message = data;

    if (typeof data === "object" && !Buffer.isBuffer(data)) {
      message = JSON.stringify(data);
    }

    this.client.send(message, this.port, this.ip, (err) => {
      if (err) {
        return this.logger.error(`NABLA ERROR (${config.nablaIp}:${config.nablaPort}): ${message}`);
      }
      this.logger.info(`NABLA: (${config.nablaIp}:${config.nablaPort}): ${message}`);
    })
  }
}

module.exports = NablaClient;