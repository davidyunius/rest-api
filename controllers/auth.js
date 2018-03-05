const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        // console.log(req.headers);
        let token = req.headers.token
        let decoded = jwt.verify(token, 'iloveyou');
        // console.log(decoded);
        if (token) {
            next()
        }else {
            res.status(401).json({message: 'you are not authorized!'})
        }
    },
    adminSession: (req, res, next) => {
        let token = req.headers.token
        let decoded = jwt.verify(token, 'iloveyou');
        if (decoded.role === 'admin') {
            next()
        }else {
            res.status(401).json({message: 'admin access only!'})
        }
    },
    bothSession: (req, res, next) => {
        let token = req.headers.token
        let decoded = jwt.verify(token, 'iloveyou');
        if (decoded.role === 'user' || decoded.role === 'admin') {
            next()
        }else {
            res.status(401).json({message: 'you have no access!'})
        }
    }
}