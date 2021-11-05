const mongoose = require('mongoose');
const { LANG } = require('../shared/constants');
const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    language: {
      type: String,
      enum: Object.values(LANG),
      unique: true
    },
    content: String,
    location: String,
    connectedImages: [{ type: Schema.Types.ObjectId, ref: 'Picture' }]
  },
  { timestamps: true }
);

exports.Model = mongoose.model('About-us', aboutUsSchema);
