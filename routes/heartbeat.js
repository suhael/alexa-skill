module.exports = function(app) {
    app.get('/heartbeat', function (req, res) {
        res.sendStatus(200);
    });
};
