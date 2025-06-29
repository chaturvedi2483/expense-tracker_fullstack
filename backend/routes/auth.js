const { register, login, getProfile } = require('../controllers/auth');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/register', register)
    .post('/login', login)
    .get('/profile', auth, getProfile);

module.exports = router;