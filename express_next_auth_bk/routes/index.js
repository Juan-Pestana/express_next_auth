const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/', function (req, res, next) {
  res.send('Hello World')
})

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      ok: true,
      message: 'Signup successful',
      user: { email: req.user.email, id: req.user._id },
    })
  }
)

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('User not found')
        return res.status(400).json({ error: info })
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: user._id, email: user.email }

        const token = jwt.sign({ user: body }, 'top_secret')

        return res.json({
          ok: true,
          token,
          user: { email: user.email, id: user._id },
        })
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  })(req, res, next)
})

router.get(
  '/profile',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res, next) => {
    res.json(req.user)
  }
)

module.exports = router
