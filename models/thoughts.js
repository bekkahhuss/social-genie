const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema({
    thoughtTitle: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    thought: {
      type: String,
    },

  });