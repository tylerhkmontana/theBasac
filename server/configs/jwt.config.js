const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET || 'secret'
const ONE_DAY = 60 * 60 * 24

const jwtModules = {
  signAdmin: (user) => {
    return jwt.sign(user, secretKey, { expiresIn: ONE_DAY })
  },
  ensureAuthorized: async (req, res, next) => {
    const { token, adminId } = req.body

    try {
      const decoded = await jwt.verify(token, secretKey)
      if(!!decoded) {
        decoded.adminId === adminId.toUpperCase() ? next() : res.status(403).send("Not authorized")
      } else {
        res.status(403).send("Not authorized")
      }
    } catch(err) {
      console.log(err)
      res.status(403).send("Not authorized")
    }
  }
}

module.exports = jwtModules