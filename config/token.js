// membuat token
const jwt = require('jsonwebtoken')

module.exports = {
    // middleware atau method function untuk membuat token
    createToken: (payload) => {
        return jwt.sign(payload, process.env.KEYTKN, {
            // token yang akan kita buat expired dalam berapa jam
            expiresIn: '12h'
        })
    },
    readToken: (req, res, next) => {
        console.log("token BE -->",req.token)
        jwt.verify(req.token, "ikea$", (err, decoded) => {
            if (err) {
                return res.status(401).send("User not authorized")
            }

            // data hasil terjemahan token
            req.user = decoded

            // melanjutkan ke middleware berikutnya
            next()
        })
    }
}