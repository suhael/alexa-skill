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
            'Authorization': 'Bearer ' + 'rPBM7I334LwuD0mSdJRwUJUh3cXfkU4QFKsBRbvpe6N6Cc5Gx2nxdgUKfWWkZLoouW_NciPvqfoubT6i56TD0CTa7Adg8gTZKO4TrDIXgT5l1DuD4Fa8y4PXMDStk_LuwsI4vKXS3qOXVmSAltA1zkT6bJhIEwvNPL8CXAZ6NnP_-emJEpQw6S5LGVAIj8nhA_SLtmHd-a8ehaBYP-W_1T9FTyBLLbMOMuNzz7CcV0wqZqfTQD4k1nxbLwi3olcrFaTZryva9N21kl-fCSgpcWgj7JG7o9RniGjryWpIxZ4y-oBbvMsO1I92U2AgvxulAvAFj-7ZFeGtZC5HDCTZIZdJkrtwaApbqdIHlPPR01oAhls_1u8sLX9qwdB2czBZ1Qpjvkyg1wOtTECq3EpVI8ZlOy7bAD_0Eb6jHX_oH3KggBW9xLGoZgMrQvQWUFlYXIH4d6UThK8189vuhqU1ysbPp-8xPbTB8j4BcSX9OkA_BKVeJHuy0jttOx4Ydik1PWrQaFjgePzuxhbdla6g7OPlB_oQ2w4Ay7mMCiKHj9z5jf5Bkrj33UtQYsV_y9783yxgOG2YD2Pg23yJlREQ3FV3HmGJiTkmbbQ_OxviFlYs0nQWz527Hk8i29en3br4Lhbz3rzbzo1wohEwhsUx1c44h6O-YfjX_3DHtzR2Y-aSeKJKMu3YPGzZ1KDdxDQ1wYCGICk2XJKEwDsLIpqlge1d6ultnACAF22taGufNLuvBQlStIZTvLVYMO9uI2FmBhDIxWTOjWnmHZaRmrvDinuTG8YBVGYH1LrgmPTaBqx8Rrl2Ib9eycNzjOlxKXAMN19ZoDyDXm9uMJIrX1TnHYBK5SacCpstY7I9tAtpvfnvXkmE7RIyFGDXOutMwp8y7WF-Q5VKnt-h5TTfKsM1oGi0OwhFZ5YslNm_DigT7N6-R5WBsKfDSBD70QIhPqHOi6tnsP4KKRqM1sEVwSqpMBSynuDsyQ8Wne5EaCdI5WEY3NvSCvYHro-unVAm3F5hlRiiieRRP9UWtc2DedLEvwo6zTyt7bDNJc_vZ0DrzBS8ES-KY1_mMfjVI5bfU-JZV_6SmEJ93eMJrb8czf2PcgF3qWfENkNXv8AuSeNm'
        },
        method: (method ? method : "GET"),
        uri: 'https://publicapi.giffgaff.com/gateway/money/v1/members/me' + endpoint
    };
    return qRequest(options);
};