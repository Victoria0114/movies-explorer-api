const router = require('express').Router();

const {
  getUser, updateUser,
} = require('../controllers/user');

const {
  userValidate,
} = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', userValidate, updateUser);

module.exports = router;
