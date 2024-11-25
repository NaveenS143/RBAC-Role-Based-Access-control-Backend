const express =require('express');
const {register,login,enableTwoFactorAuth} = require('../controllers/authController');
const router=express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/enable-2fa',enableTwoFactorAuth);

module.exports = router;