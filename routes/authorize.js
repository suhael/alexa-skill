var crypto = require('crypto');

function decrypt(cfg, text){
    var decipher = crypto.createDecipher(cfg.crypto.algorithm, cfg.crypto.password);
    var decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = function (app, cfg) {

    app.post('/authorize', function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(decrypt(cfg, req.body.code));
    });

};
