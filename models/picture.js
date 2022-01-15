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
    description: String
  },
  { timestamps: true }
);

pictureSchema.statics.createPictureFromPictureInput = async function (pictureInput) {
  console.log('createPictureFromPictureInput, input:', pictureInput);

  const { title, imageFile, tags, description } = pictureInput;
  const { createReadStream, mimetype } = await imageFile;
  const stream = createReadStream();
  const imageChunks = [];

  for await (const chunk of stream) {
    imageChunks.push(chunk);
  }

  const image = {
    data: Buffer.concat(imageChunks).toString('base64'), // Might take a bit more storage but for smaller files it's fine - also, in graphQL it's preferable to fetch
    contentType: mimetype
  };

  const tagIds = tags.map((tag) => tag._id);

  const pictureModel = await Picture.create({
    title,
    image,
    tags: tagIds,
    description
  });

  return pictureModel._id;
};

pictureSchema.statics.findOneOrCreate = async function (pictureInput) {
  return (
    (await this.findOne({ title: pictureInput.title })) ||
    this.createPictureFromPictureInput(pictureInput)
  );
};

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = {
  Model: Picture
};
