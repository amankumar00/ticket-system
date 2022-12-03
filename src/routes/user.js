const express = require('express');
const { createUser, updateUser, deleteUser } = require('../controller/user');
const router = express.Router();

router.post('/new', createUser);

router.patch('/update/:uid', updateUser )

router.delete('/delete/:uid', deleteUser)
module.exports = router;