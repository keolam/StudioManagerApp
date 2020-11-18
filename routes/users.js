const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/users');

router
    .route('/')
    .get(getUsers);

/*router
  .post('/login');
*/

router
  .route('/:id')

module.exports = router;