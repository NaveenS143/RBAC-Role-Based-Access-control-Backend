const express = require('express');
const verifyToken=require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const router = express.Router();

//only admin can access
router.get('/admin', verifyToken,authorizeRoles("admin"),(req, res) => {
  res.json({ message: 'Admin access granted' });
});

//both admin and manager can access

router.get('/manager',verifyToken,authorizeRoles("admin","manager"),(req, res) => {
  res.json({ message: 'Manager access granted' });
});

//all can access

router.get('/user', verifyToken,authorizeRoles("admin","manager","user"),(req, res) => {
  res.json({ message: 'User access granted' });
});

module.exports = router;