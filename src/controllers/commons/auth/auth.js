const User = require('../../../models/users').users;
const Utils = require('../utils');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')

passport.use('login', new localStrategy({
  usernameField: 'doc',
  passwordField: 'password',
}, async (doc, password, done) => {
  
  let userModel = await Utils.getModel('public', User);
  const user = await userModel.findOne({
    where: { doc: doc }    
  })
  const userInfo = user ? user.get({ plain: true }): null
  
  if (!userInfo) {
    return done(null, false, 'No se encontró el usuario')
  }
  
  const validUser = await bcrypt.compare(password, userInfo.password)
  
  if (validUser) {
    return done(null, userInfo, 'Inicio de sesión exitoso')
  } else {
    return done(null, false, 'Credenciales inválidas. Verifica usuario y contraseña.')
  }

}))

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
  try {
    return done(null, payload.user)
  } catch (error) {
    done(error)
  }
}))