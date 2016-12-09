module.exports = function(app, cfg) {
    var authenticate = require('./authenticate.js'),
        authorize = require('./authorize.js'),
        heartbeat = require('./heartbeat.js');
    authenticate(app, cfg);
    authorize(app, cfg);
    heartbeat(app);
};