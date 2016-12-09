'use strict';
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

module.exports = function (token, endpoint, data, method) {
    var options = {
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + 'PdxgMqMBAWbUypAEp3HZ5r5m9Xj735d35ZmJwZadbLVCGcR1v3SBIsejbn0lfiN47dSzd5uph0FVpHmLrqNSiLYcuTcR_81P4aC35-Z2eiIGdu_Ep3tvYi71d-C9_E3GkTvKNGTB_tysRW1tcziFJ7ZnK1FqpxyEMnV1LIpD2PCDywbgUodiK0X1LjyGQec6yGS-_gYYvflWnMcGsLCJktsghsFx-TNhPfsTD3XCKPkWrgAn_Cw8qM1KKo1e1iKrTdn4eB0edw8pKJ3PUNJBCYUzDv1UgogkA8PC-ObDcK9w6O3lVvu4QOR3c5OdFQcqvXNG5-WdhI97oAEtjTY6LqLZ2tusdjQ_fIrjnXD1-oDjt5PZE8zJMnd9zRrRC9uPCTUNbQgp_jx2-HEF2BjofoE1nImhDKGGkSoV99RJEtl3uQ4QB-bXTvOJaJguVeIJAHYe6XpEwJUSCix4Mp0YtviV8k5graQRbfOglSFDdgY0eeNNIprrcGme_iLWXRIqgFSMOvLkxOC8wjEL2SuEDhKgqvrDCRDCeLlbMUmyS4TEW-HmbBQv_r8Xr_w6RLHt9gymjQM5hl72hH7xgQYq7csk2gQsgjz42XZ98iH2-uUCeUKKqWITR_QLGHt2GV5jbUtXIQ5CVDeb43AeYW-F-r24qllw2yDPPPLRfEBrNYOQtQfjR5ywndb31xGCOaoQXAm4yq-Q5H7uq5O_6muNVB2gz5JRpQ71qUcefaZS3DA5EH4wfEs_cvNoXIR5fnmNY6LnIqvnNqfYkDIZ1248QMGQDe-kBgtyQnvh8HatnxlwGyF1bWJifvx9LGLDZ0hoqFV3xarzZIUxq2fShTyaaSz1mTrpBoEF1ISOABaGj4k0rI09BFGthPerXrV0uAfG5JjFNAphiT9WZbVmAkbeJzCzMi0OJeAOxtusFKvAjxdeq7cRTS33jincA81bgH0IH9JLnGEoaGWw07yUFBIKVwtYhWUGNXNM5gmRWnfNa3VNjHUFpu8Rilpe0FDqBOn_HTAKfpgB9Iyj73ApE7J_2j8IjvG1GSiQano9e2wmWSXB2waZgis7emFyztMuX9XiS2abXul8oSdjRFP3PGuH0oocctAUD5V8nsZ5rajE'
        },
        method: (method ? method : "GET"),
        uri: 'https://publicapi.giffgaff.com/gateway/money/v1/members/me' + endpoint
    };
    return qRequest(options);
};