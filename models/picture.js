const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    title: { type: String, required: true },
    img: Buffer, //TODO: change to something else later on
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    description: String,
    connectedTiles: [{ type: Schema.Types.ObjectId, ref: 'Tile' }]
  },
  { timestamps: true }
);

exports.Model = mongoose.model('Picture', pictureSchema);
