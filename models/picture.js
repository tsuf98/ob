const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    title: { type: String, required: true },
    img: String, //TODO: change to something else later on
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    description: String,
    connectedTiles: [{ type: Schema.Types.ObjectId, ref: 'Tile' }]
  },
  { timestamps: true }
);

exports.PictureModel = mongoose.model('Picture', pictureSchema);
