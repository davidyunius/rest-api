var express = require('express');
var router = express.Router();
const users = require('../controllers/user.controller')
const check = require('../controllers/auth')

//sign up
router.post('/signup', users.signUp)

//sign in
router.post('/signin', users.signIn)

//get all user info
router.get('/users', check.auth, check.adminSession, users.viewAll)

//get single user info
router.get('/users/:id', check.auth, check.bothSession, users.viewOne)

//create a user
router.post('/users', check.auth, check.adminSession, users.createUser)

//delete a user
router.delete('/users/:id', check.auth, check.adminSession, users.deleteUser)

//update a user with new info
router.put('/users/:id', check.auth, check.bothSession, users.editUser)

module.exports = router;