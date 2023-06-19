const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    note: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
