const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const NotesController = require('../Controllers/NotesController');
const authenticate = require('../middleware/Authenticate');

router.get('/', authenticate, NotesController.list);
router.post(
  '/write',
  [body('note', 'Field cannot be empty.').trim().notEmpty()],
  authenticate,
  NotesController.write
);
router.post('/delete', authenticate, NotesController.purge);

module.exports = router;
