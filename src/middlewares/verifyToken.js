const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if(err){
                console.log(err);
                req.userId = null;
                req.message = "Header verification failed, some issue with the token!!"
                next();
            }else{
                req.userId = decoded.userId;
                req.message = "User found succefully!!"
                next();
            }
        });
    }else{
        req.userId = null;
        req.message = "Authorization header not found!!"
        next();
    }
}