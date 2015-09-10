var express = require('express');
var router = express.Router();
var hrh = require('msda-http-request-helper');

var requestHelper = new hrh({
    host: '192.168.23.156',
    port: 8080,
    path: '/api/'
});

// GET /ErrorsService/Applications
router.get('/ErrorsService/Applications', function (req, res, next) {
    var requestData = {};
    requestHelper.request('GetAllApplications', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});

// GET /ErrorsService/Applications/applicationId
router.get('/ErrorsService/Applications/:applicationId', function (req, res, next) {
    var requestData = {
        applicationId: req.params.applicationId
    };
    requestHelper.request('GetApplicationByApplicationId', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});

// POST /ErrorsService/Applications
router.post('/ErrorsService/Applications', function (req, res, next) {
    var body = req.body;
    var requestData = {
        applicationId: body.applicationId,
        code: body.code,
        name: body.name,
        description: body.description,
        errorsList: body.errorList
    };
    requestHelper.request('AddApplication', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});

// POST /ErrorsService/Errors
router.post('/ErrorsService/Errors', function (req, res, next) {
    var body = req.body;
    var requestData = {
        applicationId: body.applicationId,
        error: body.error
    };
    requestHelper.request('AddToErrorList', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});

// PUT /ErrorsService/Errors
router.put('/ErrorsService/Errors', function (req, res, next) {
    var body = req.body;
    var requestData = {
        applicationId: body.applicationId,
        error: body.error
    };
    requestHelper.request('UpdateErrorList', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});

// DELETE /ErrorsService/Errors/applicationId/errorCode
router.delete('/ErrorsService/Errors/:applicationId/:errorCode', function (req, res, next) {
    var params = req.params;
    var requestData = {
        applicationId: params.applicationId,
        error: {code: params.errorCode}
    };
    requestHelper.request('RemoveFromErrorList', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response);
        }
    });
});

module.exports = router;
