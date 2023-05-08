import mongoose from "mongoose";

const gamePlayModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  score: Number
});

export default mongoose.model('GamePlay', gamePlayModel);
