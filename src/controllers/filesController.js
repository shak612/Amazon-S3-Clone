const { uploadService } = require("../services/fileServices/uploadService");
const { readService } = require("../services/fileServices/readService");
const { downloadService } = require("../services/fileServices/downloadService");

exports.uploadController = (req, res) => {
    uploadService(req).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.message
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.readController = (req, res) => {
    readService(req).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

exports.downloadController = (req, res) => {
    downloadService(req.query.directory, req.query.filename, req.userId).then((response) => {

        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response.data
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: err.message
        })
    })     
}

