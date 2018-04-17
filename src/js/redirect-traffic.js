/* global location window */

const redirectTraffic = {
  register() {
    // redirect traffic to HTTPS from HTTP
    if (window.location.hostname !== 'localhost'
        && window.location.hostname !== '127.0.0.1'
        && window.location.protocol !== 'https:') {
      window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
    }
  },
};


module.exports = redirectTraffic;
