const jwt = require('jsonwebtoken')


const JWT = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const data = jwt.verify(token, "test_salt")
        req.token = data;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ error: "Token is not valid" })
    }

}

module.exports = { JWT };