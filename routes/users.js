const express = require('express');
const router = express.Router();

const { getUsers, authUser, getUser } = require('../controllers/users');

router
    .route('/')
    .get(getUsers);

/*router
    .route('/login')
    .post(authUser);*/
router.post('/login', authUser);

router
  .route('/:id')
  .get(getUser);  

module.exports = router;