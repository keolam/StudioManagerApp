const express = require('express');
const router = express.Router();

const { getUsers, authUser, getUserProfile, getUserById } = require('../controllers/users');
const { protect } = require('../middleware/auth');

router
    .route('/')
    .get(getUsers);

router.post('/login', authUser);

router
    .route('/profile')
    .get(protect, getUserProfile) /*protect, */

router
  .route('/:id')
  .get(getUserById);  

module.exports = router;