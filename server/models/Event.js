const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  paragraph: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;