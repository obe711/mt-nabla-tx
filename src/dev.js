//const nabla = require("../index");
const logger = require("./config/logger");
const clientSend = require("./client");
const nablaTx = require("../index")


// class DevNabla {
//   constructor(options = {}) {
//     this.host = options?.host;

//     Object.assign(this, { clientSend });
//   }

//   accessLog(logObject) {
//     this.clientSend(logObject);
//   }

//   site(opts) {
//     if (!opts.host)
//       return logger.error('Host not defined');

//     this.host = opts.host;

//     return this
//   }
// }

// const nablaTx = new NablaTx();

nablaTx.accessLog({ obe: "hidd" });

const nabla = nablaTx.site({ host: "sdfgjk" });

nabla.accessLog({ worked: "yes" })