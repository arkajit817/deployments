const deployment = require('../routes/deployment');



module.exports = function (app) {
    app.use('/api/adddeployment', deployment);
}

