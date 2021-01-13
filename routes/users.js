const router = require('express').Router();
const { findAllUsers, findUser } = require('../controllers/users.js');

router.get('/', findAllUsers);
router.get('/:id', findUser);

module.exports = router;
