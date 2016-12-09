var moment = require('moment'),
    q = require('q'),
    request = require('request');

var qRequest = function (options) {
    var deferred = q.defer();
    var timestamp = moment();
    request(options, function (err, res, body) {
        if (err) {
            res.write(err);
            deferred.reject(err);
        } else {
            perfLog('Request', timestamp, options.uri);
            if (res.statusCode === 200) {
                try {
                    deferred.resolve(res.headers['content-type'].indexOf('application/json') !== -1 ? JSON.parse(body) : body);
                } catch (e) {
                    deferred.reject(e.message);
                }
            } else {
                deferred.reject(res.statusCode);
            }
        }
    });
    return deferred.promise;
};

var perfLog = function (process, timestamp, operation) {
    console.log(process + ' took ' + moment().diff(timestamp) + 'ms' + (operation ? ' for ' + operation : ''));
};

module.exports = function (cfg, endpoint, data, method) {
    var options = {
        auth: {
            user: cfg.giffgaff.client_id,
            pass: cfg.giffgaff.client_secret
        },
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: (method ? method : "GET"),
        uri: cfg.giffgaff.api + endpoint
    };
    return q.when(cfg.giffgaff.api ? qRequest(options) : null);
};