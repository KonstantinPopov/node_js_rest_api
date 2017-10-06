
exports.success = (res, data, statusCode) => handleResponse(res, 'Success', data, statusCode);

exports.error = (res, error, statusCode) => handleResponse(res, 'Error', error.message, statusCode);

function handleResponse(res, type, data, statusCode = 200)
{
    let responseData = {status: type};
    if (type == 'Error') {
        responseData.error = data;
    } else {
        responseData.data = data;
    }
    res.status(statusCode).json(responseData);
}

exports.isValidRequestContentType = function (req, contentType) {
    return (req.headers['content-type'] || contentType) === contentType ? true : false;
}
