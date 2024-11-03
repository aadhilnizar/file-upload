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
Router.route('/upload').get(getUploadPage).post(UploadedFIle);

module.exports = Router;