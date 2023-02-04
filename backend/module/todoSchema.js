const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

const todoModle = mongoose.model("todo", todoSchema);

module.exports = todoModle;
