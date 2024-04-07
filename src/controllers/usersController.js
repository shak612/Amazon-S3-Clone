const { registerService } = require("../services/userServices/registerService");
const { loginService } = require("../services/userServices/loginService");

exports.registerController = (req, res) => {
    registerService(req.body).then((response) => {
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

exports.loginController = (req, res) => {
    loginService(req.body).then((response) => {
        if (!response.status) {
            throw new Error(response.message);
        }
        res.status(200).json({
            status: response.status,
            response: response
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
