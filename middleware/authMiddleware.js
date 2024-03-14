const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const token = req.cookies.jwtToken
        if (!token) {
            return res.status(401).json({ message: "Unauthenticated User", success: false })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Network Error", success: false })
    }
}

module.exports = authenticateUser