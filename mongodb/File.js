const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  encoding: String,
  data: Buffer, // Store file content as binary data
});

module.exports = mongoose.model('File', fileSchema);