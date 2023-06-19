const Notes = require('../Models/Notes');
const { validationResult } = require('express-validator');

const { getUserIDFromToken } = require('../middleware/UserIDToken');

// lists all notes which are connected to the logged on user id
const list = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const id = getUserIDFromToken(token);

    const response = await Notes.find({ user_id: id });

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: `An error has occured ${error}`,
    });
  }
};

// write notes
const write = async (req, res, next) => {
  try {
    // express-validator (routes) error display
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    const notes = new Notes({
      note: req.body.note,
      user_id: getUserIDFromToken(req.cookies.token),
    });

    await notes.save();
    res.status(201).json({ message: 'Note added.', note: notes });
  } catch (error) {
    res.status(500).json({ message: `An error has occured: ${error}` });
  }
};

// deletes notes but only if the user id stored on the note matches the user id in the token
const purge = async (req, res, next) => {
  try {
    const noteID = req.body.id;

    await Notes.findOneAndRemove({ _id: noteID });
    res.status(200).json({
      message: `Note has been deleted. ${noteID}`,
    });
  } catch (error) {
    res.status(500).json({
      message: `An error has occured: ${error}`,
    });
  }
};

module.exports = {
  list,
  write,
  purge,
};
