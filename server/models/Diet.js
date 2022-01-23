const mongoose = require('mongoose');

const { Schema } = mongoose;

const dietSchema = new Schema({
  name: {
    type: String,
    trim: true
  }
});

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet;
