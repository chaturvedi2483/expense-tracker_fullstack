const { 
    register, 
    login, 
    getProfile, 
    verifyOTP, 
    resendOTP, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/auth');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/register', register)
    .post('/verify-otp', verifyOTP)
    .post('/resend-otp', resendOTP)
    .post('/login', login)
    .post('/forgot-password', forgotPassword)
    .post('/reset-password', resetPassword)
    .get('/profile', auth, getProfile);

module.exports = router;