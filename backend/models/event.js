const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  type: String,
  alert: String,
  timestamp: Date,
  syscall_sequence: [String]
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
