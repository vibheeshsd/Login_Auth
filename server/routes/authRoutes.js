const express = require('express');
const cors = require('cors');
const { test, userRegister,userLogin, getProfile } = require('../controllers/authControllers')
const router = express.Router();

router.use(
    cors({ 
        credentials:true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test)
router.post('/register', userRegister)
router.post('/',userLogin)
router.get('/profile' , getProfile)


module.exports = router;