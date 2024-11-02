const Router = require("express").Router();
const {
getLoginPage,
loginUser
} = require('../controllers/auth.controllers')

const {
    getSignupPage,
    SignupUser
    } = require('../controllers/auth.controllers')
    

Router.route('/login').get(getLoginPage).post(loginUser);
Router.route('/signup').get(getSignupPage).post(SignupUser);

module.exports = Router;