const { Model: Picture } = require('../../models/picture');

const tagResolvers = {
  Query: {
    getPictures: async (_, { query = {} }) => Picture.find(query)
  },
  Mutation: {
    createPicture: async (_, { pictureInput }) =>
      Picture.createPictureFromPictureInput(pictureInput)
  }
};

module.exports = tagResolvers;
