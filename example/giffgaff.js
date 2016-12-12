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
            'Authorization': 'Bearer ' + 'n60SSMk33GWp1BgotPncudo_vf_sLvvhdm8R2rb2GtIbwfczL5woK0uVzMBbsajophNeAODaa-9ohmT6hcN2WZyJZi9KJ4Mk_G7MbzANCFf1419RTE8XS5SxgIKr4P4Mf96RDovWfV0XztozAjvUpxSKAv8H6Tx1zkvF-uKzSjtMHeGwCen6mCXoXwd-gkUvYJEteuE5w_5P0aehvZijv38-S_ScS92MXSgWEIx0oWYR-0yTH-5QsE2m8K43OBF6b6j1N3s84YW2KLR_BS80e1fwqBvK6409vtBdwGodvCaR_1aXZcf7vO9Zfay4lgpbbaPmGB-RUImTXugPYc2BF6Yh5VNBL3G9KHnMOe_pdE6UQX7ePstWW2LIQiVjFnTkKCizsWJzqyozH3LBc631hzWhhrpLOp1CqS86lX3MhjW9UInTFgDXGVleItXwYmCoJLQZyyU2d1SnGMA9uAO-i7z__Bi83az2sTh6sMUKjT_ycFN5dowzZvXIRQGY5gq7SPi390qxwqxZ8hvZy9URgjhJtk5HW7sCwpxS0B1MD_FLijGZFjoqIzKJhmg61hlI3qnMJl3Onh9P5rd4IGUF9g7ZH8KN5StN03_Tv_iEYf6dY1gwFETDl2lfSYFJcmRMdJxy1L7RwiRY-Gd5VloHpEm-QBvGSeWbonX3zgujhrxNI0A3Yw2oHZe3wfZcv4gJVTd2H7PcCr_OXJxod1oBrAjGR6F7lyOD_ek-ui82sENV8ZGKtMfAOnnca-ZMzLN_YomAT55AIv1QkzNUndpbYSJZHXIr0K4Z1cO-9oh5EbgC5UNN0esvOtMAT8caUNwmLnZTvwkm9H1kwUo2mhqVUIWQ5hfrW7fWfNPWCK6G9Qbf7XyqI4zuCOQfWoZbi3KXHjOYK84L2aHN5wKr73WY8KqqWaf00MC1tn5DREEG8HMrPmxzIrZnj3lmDn23vBmeQIOB5XScUkhZvq754MEtCAkIU85HKdCiaZOTshcKBmT6bnjRxVsWf6-T6iB-O27zCyLXku6dNXckgstG9LeWwv1jjtYhCSkcAcOM8EssVbLcV8gvhQPUz6BdjzwWGR9fJ1P0WkgRgz4SSXvUzYaEIAw0-yBZJ1D980UU4maY'
        },
        method: (method ? method : "GET"),
        uri: 'https://publicapi.giffgaff.com/gateway/money/v1/members/me' + endpoint
    };
    return qRequest(options);
};