const { uploadService } = require("../services/fileServices/uploadService");

exports.uploadController = (req, res) => {
    uploadService(req.body).then((response) => {
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
