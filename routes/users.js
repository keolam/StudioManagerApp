const express = require('express');
const router = express.Router();

const { getUsers, getUser, addUser, editUser, deleteUser } = require('../controllers/tasks');

router
  .route('/')
  .get(getUsers)
  .post(addUser);


router
  .route('/:id')
  .get(getUser)
  .post(editUser)
  .delete(deleteUser);

module.exports = router;