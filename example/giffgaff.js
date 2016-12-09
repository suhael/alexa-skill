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
            'Authorization': 'Bearer ' + 'PtL_IfhbK_IU-7DsBF1ifPT_fUdU1hUNzD3pNnY4nz76O7r4yKDegdWjKpiPl011vlypi7IOGIeB1jLf9nqEugaqHvnpsT9bSxwylUA4T_6Y2yMaKYqTtjMRfkFLF_IO95jnMc1Rk2-ypezzBDwO_prbqiBRISNHLRRFdPwnr1AlS10uJZte92yPc2s3K-0FrlvBotZmOpiO6tZ5RNY54Y84mrN-xHh3DBjTvjq_A3tKGcSnBDIgY_Yav1pI8IyYUFHMHmu8ocsBz3nbfS5_YlaUL5Cf8igQUBLBX0qLT3eyJKPIHFcRB-SyuBVdAR_Ix4JKL9vq-B2289iF9yMqtOkmToPNGa3tBvKNEuM25iVCZXJHzkj2WcUqOMvCjq_GoiiIHydNbGbldPk0vRjUjMwSD5A8Pm5fp5GSwcqIrt8pv8e5gfdEH6ApqNBxs6ejRJRyj_-RAbdbLsNpp8lz-WwMeflVrosVuqk1SydCNmgNtVblUsONZpDXDRwK9iO3BbQnFCjCYs3nVaNbPb8OuoRHAP_i70Kgu7nHvK2kqWme81ppP_A7jzjuvNIXYcP5A5wXIcX_IJPf46S4_yGjPr35nlBnPBi8r-M5U81e6kF2q_Ce-tsompLsiA8bHin9SX_p13_9RkWFreTOdhtlz24BAOa_aTT5qB-DkXec_m6haquHAI5I6rzypfFsmKXmo1KCbrePbIEo3EvQugpUG613cQbPRT6vVbyGWQlA_WW1atbnZ2jcsB_OhBZVZJcz5yDVaTPCwd7e82hFMlZRNqW0J6zyRSLIiwHnIE_blJmNDCcYHBNFljTyV37Jzsnn04LecPlYrSerwqWSIdBvZdBcESlh3LNzdTi1pxaKDnU7x7OsMGzxZiLEeYuJQ9vky3KXxaNCN3fn5l67pT3VcGsmb95ZBoL9Jo2oN-ERGzBK9Uh8c101Iui1alt7ClXGexUek4pF2OkyK1tNolCfzOksou2K8LWFJ-HpOf_SDFUKkrnLvmeLN4nHxI2aFJGZyTj2-UPtMP1deEKxziL9dhVTPamzXEhDhV1PSoy3fAwRpiW1MVK6BdQz2QGcpEOncuf-Oq2RM9f734d9j1BeaXXVAaY5sRgfNz6-exFv'
        },
        method: (method ? method : "GET"),
        uri: 'https://publicapi.giffgaff.com/gateway/money/v1/members/me' + endpoint
    };
    return qRequest(options);
};