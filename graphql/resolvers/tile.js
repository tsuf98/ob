const { Model: Tile } = require('../../models/tile');
const { Model: Picture } = require('../../models/picture');
const { Model: Tag } = require('../../models/tag');

const tileResolvers = {
  Query: {
    getTiles: async (_, { query = {} }) =>
      Tile.find(query).populate('tags').populate('connectedImages')
  },

  Mutation: {
    createTile: async (_, { tileInput }) => {
      console.log('creating tile, input: ', tileInput);
      const { title, connectedImages, tags, description, size } = tileInput;
      const pictureIds = [];
      const tagModels = [];

      console.log('createTile1');

      for await (const tagModel of tags.map((tagInput) => Tag.findOneOrCreate(tagInput))) {
        tagModels.push(tagModel);
      }

      for await (const pictureId of connectedImages.map((pictureInput) =>
        Picture.createPictureFromPictureInput({ ...pictureInput, tags: tagModels })
      )) {
        pictureIds.push(pictureId);
      }

      console.log('createTile2');

      console.log('createTile3');

      Tile.create({
        title,
        connectedImages: pictureIds,
        tags: tagModels.map((tag) => tag._id),
        description,
        size
      });
    }
  }
};

module.exports = tileResolvers;
