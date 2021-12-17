const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      data: String,
      contentType: String
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    description: String,
    connectedTiles: [{ type: Schema.Types.ObjectId, ref: 'Tile' }]
  },
  { timestamps: true }
);

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = {
  Model: Picture
};
