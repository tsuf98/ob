const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    hidden: { type: Boolean, default: false }
  },
  { timestamps: true }
);

tagSchema.statics.findOneOrCreate = async function ({
  name,
  hidden
}) {
  return (
    (await this.findOne({ name })) || this.create({ name, hidden })
  );
};

const Tag = mongoose.model('Tag', tagSchema);

module.exports = {
  Model: Tag
};
