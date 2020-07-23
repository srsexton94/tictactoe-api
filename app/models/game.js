const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  cells: {
    type: Array,
    required: true,
    // Default is 9 empty strings to represent each spot in the game board
    default: ['', '', '', '', '', '', '', '', '']
  },
  over: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)
