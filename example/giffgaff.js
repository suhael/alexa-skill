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
            'Authorization': 'Bearer ' + 'NqTHK3I_4PhgA_0nbtLLjxI7Qm8sY5svG-hXnSx835tjNk2nlrd268NdQPr2Z_8QLXMj6zfALAUQW9I5C4_M-avrf15tB87ROFkzQTLhS6tbaFxCIl3JDbN9wokr8ravCm9DBZ2Kksm__MW_-iRGuQV1s4A2vKhe7SSm-Q0fMRB0nuqv3AuKcO4lt2gRjLHD8P9FJNgV-RPvmJIjYD0fXIl5JhHSpcp51ttzVAlVbf_NtsIUx9Btri78-8_G9jflLJYXHa_mE04WL2Z-s60jQq5bevYhvXYzOFSyvrZY4gcEF2l0xS9k8TbbRO456Ryt8YA4J_qwhWVgvlmj_TGuaRrHRwfsLEhNXHwWKDDQjAoBopm6-Tqddz_TsGr-72OLCZ52j-Upo4Y440wG-fgIzifrgNCkOs6eCkuWEiVPzG4CtPeTFC_7ZQhmV_zWpBJAMhyu6sNsv7HkrbfrdacLNkabpl85XU_pK8zv2a40uL4NXoXdwrVrwryh2igjVE3jJY0Wgsb424DBSUFZC75wkJPEn8w9BB0DJ2UWLgfMhkEYF4U9SBzjr0hG0SiEdF-5j9WwuO9rPb8IY9XGI5fqngZAhR-5aS3QVT76bijKXSKthSfpbSbKUcsTmHXYdxIlG5m2eyb5n20UM--tXsQM6LlfGFTQQ80Uppb_6KI40FvHzonzsKhqjAoGBQvVcWNsSSOImPGeYykzEIoXy_KARo9g1Euu2_ELR8IiE7xMpYb-0zOFOMMiZnxidtNM80oSBBRfsw0_rBWsMYqE8bcIA0ap1kQXhgEEUEAm7AJcki7JjuHkfv13Q6VUQuExTfkInxPlcjva1ndVN63oHEQ42vqxZdJH0VNKfcEdjHYc7kP1ma3vgJvrCxWga1CEvh5yMBGc85pHyR9SgbaH4uvHt0YATDoMXRpVQ58O_82L4A0gLUsMEwgrQGXtk2o0qaGngrILazC9OtVPbKIeZItEZDskQLwfL-OzoBeaSAva-EnSr7XP6w0HV0GnCY0HAokje0ers2VS5M7e1z0fG2cpdBitlP6fJHDm8TIgS1ZZWrG3vq8DAev8qdICBXPYWpDLGoPegoEr70N-hsIueDOtiXdcseSk1HwbogblsbjI'
        },
        method: (method ? method : "GET"),
        uri: 'https://publicapi.giffgaff.com/gateway/money/v1/members/me' + endpoint
    };
    return qRequest(options);
};