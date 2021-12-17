const { Model: Picture } = require('../../models/picture');

const tagResolvers = {
  Query: {
    getPictures: async (_, { query = {} }) => Picture.find(query)
  },
  Mutation: {
    createPicture: async (_, { pictureInput }) => {
      const { title, imageFile } = pictureInput;
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

      Picture.create({
        title,
        image
      });

      return { title, image };
    }
  }
};

module.exports = tagResolvers;
