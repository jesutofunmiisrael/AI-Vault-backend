const mongoose = require("mongoose");

const aiHistorySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",

  },

  type: { 
    type: String, 
    enum: ["text_to_speech", "image", "video"], 
    required: true 
  },

  input: { 
    type: String, 
    required: true 
  },

  outputUrl: { 
    type: String 
  },  

  outputBase64: {
    type: String
  },

}, { timestamps: true });

module.exports = mongoose.model("AIHistory", aiHistorySchema);
