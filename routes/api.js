var express = require('express');
var router = express.Router();
var hrh = require('msda-http-request-helper');

var requestHelper = new hrh({
    host: 'bl.msda.ge',
    port: 3120,
    path: '/api/'
});

// GET /errors-service/applications
router.get('/errors-service/applications', function (req, res, next) {
    requestHelper.request('GetAllApplications', {}, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});
// GET /errors-service/applications/{applicationId}
router.get('/errors-service/applications/:applicationId', function (req, res, next) {
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
// POST /errors-service/applications
router.post('/errors-service/applications', function (req, res, next) {
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

// POST /errors-service/applications/{applicationId}/errors
router.post('/errors-service/applications/:applicationId/errors', function (req, res, next) {
    var requestData = {
        applicationId: req.params.applicationId,
        error: req.body.error
    };
    requestHelper.request('AddToErrorList', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});
// PUT /errors-service/applications/{applicationId}/errors
router.put('/errors-service/applications/:applicationId/errors', function (req, res, next) {
    var requestData = {
        applicationId: req.params.applicationId,
        error: req.body.error
    };
    requestHelper.request('UpdateErrorList', requestData, function (error, response) {
        if (error) {
            next(error);
        } else {
            res.json(response.data);
        }
    });
});
// DELETE /errors-service/applications/{applicationId}/errors
router.delete('/errors-service/applications/:applicationId/errors', function (req, res, next) {
    var requestData = {
        applicationId: req.params.applicationId,
        error: {code: req.query.code}
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
