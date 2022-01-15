const mongoose = require('mongoose');
const { TILE_SIZE } = require('../shared/constants');
const { Schema } = mongoose;

const tileSchema = new Schema(
  {
    title: { type: String, required: true },
    connectedImages: [{ type: Schema.Types.ObjectId, ref: 'Picture' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    description: String,
    size: { type: String, enum: Object.values(TILE_SIZE) }
  },
  { timestamps: true }
);

tileSchema.statics.findOneOrCreate = async function (tileInput) {
  return (await this.findOne({ title: tileInput.title })) || this.create(tileInput);
};

const Tile = mongoose.model('Tile', tileSchema);

module.exports = {
  Model: Tile
};
