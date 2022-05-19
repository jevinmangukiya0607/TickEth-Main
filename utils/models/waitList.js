const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.models.Mail || mongoose.model('Mail', mailSchema);
