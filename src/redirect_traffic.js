// redirect traffic to HTTPS from HTTP
if (location.hostname != 'localhost' && location.hostname != 'localhost' && location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
