const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET || 'secret'
const ONE_DAY = 60 * 60 * 24
const Admin = require("../models/Admin")

const jwtModules = {
  signAdmin: (user) => {
    return jwt.sign(user, secretKey, { expiresIn: ONE_DAY })
  },
  ensureAuthorized: async (req, res, next) => {
    if(req.headers['authorization']) {
      const token = (req.headers['authorization']).split(" ")[1]

      try {
        const decoded = await jwt.verify(token, secretKey)
        if(!!decoded) {
          await Admin.findOne({ adminId: decoded.adminId }) ? next() : res.status(403).send("Not authorized")
        } else {
          res.status(403).send("Not authorized")
        }
      } catch(err) {
        console.log(err)
        res.status(403).send("Not authorized. Your token might have been expired. Please log out and log back in")
      }
    } else {
      res.status(403).send("Not authorized")
    }
  }
}

module.exports = jwtModules