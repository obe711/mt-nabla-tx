
const { EventEmitter } = require('node:events');
const NablaClient = require("./NablaClient");
const config = require("./config/config");
const DevNull = require("./DevNull")


class NablaTx extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = options;
    this.logger = options.logger || new DevNull();
    this.ip = options.ip || config.nablaIp;
    this.port = options.port || config.nablaPort;
    this.nablaClient = new NablaClient(this.options);

    this.logger.info(`TX Created - ${this.ip}:${this.port}`);
  };

  accessLog(logObject) {
    const { host } = logObject;
    const messageMeta = { nablaId: "access", origin: host || this.ip }
    Object.assign(logObject, { nabla: messageMeta });
    this.nablaClient.clientSend(logObject);
  }

  systemStatus(statusObject) {
    const { hostname } = statusObject;
    const messageMeta = { nablaId: "system", origin: hostname || this.ip }
    Object.assign(statusObject, { nabla: messageMeta });
    this.nablaClient.clientSend(statusObject);
  }

  site(opts) {
    if (!opts.host)
      return this.logger.error('Host not defined');

    this.host = opts.host;

    return this
  }
}

module.exports = NablaTx;