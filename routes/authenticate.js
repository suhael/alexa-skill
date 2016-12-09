var crypto = require('crypto'),
    giffgaff = require('./giffgaff') ;

function encrypt(cfg, text){
    var cipher = crypto.createCipher(cfg.crypto.algorithm, cfg.crypto.password);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = function (app, cfg) {

    app.get('/authenticate', function (req, res) {
        res.render('index', {
            state: req.query.state,
            redirect_uri: req.query.redirect_uri
        });
    });

    app.post('/authenticate', function (req, res) {
        giffgaff(cfg, '/oauth/token?grant_type=password&username=' + encodeURIComponent(req.body.username) + '&password=' + encodeURIComponent(req.body.password))
            .done(function (data) {
                res.redirect(req.body.redirect_uri + '?state=' + encodeURIComponent(req.body.state) + '&code=' + encrypt(cfg, JSON.stringify(data)));
            }, function (error) {
                console.log(error);
                res.render('index', {
                    state: req.body.state,
                    redirect_uri: req.body.redirect_uri,
                    error: 'Oops, wrong member name/mobile number or password. Remember passwords are case-sensitive, so double check and give it another go.'
                });
            });
    });

};
