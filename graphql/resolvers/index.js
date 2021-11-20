const { GraphQLUpload } = require('graphql-upload');
const tagResolvers = require('./tag');
// const { PictureModel } = require('../../models/picture');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // aboutUs: async (root, { lang }) => {
    //   console.log(lang);
    //   return AboutUs.findOne({ language: lang });
    // },
    // tiles: () => find(Tile),
    ...tagResolvers.Query
  },
  Mutation: {
    // aboutUs: (root, { input }) => {
    //   console.log(input);
    //   return create(AboutUs, input);
    // },
    // tiles: (root, { input }) => create(Tile, input),
    ...tagResolvers.Mutation,
    createPicture: async (parent, { pictureInput }) => {
      const { title, img } = pictureInput;
      console.log('title is: ', title);
      const { createReadStream, filename, mimetype } = await img;

      console.log('createReadStream is: ', createReadStream);
      console.log('filename is: ', filename);
      console.log('mimetype is: ', mimetype);

      // console.log('img is: ', img);

      // PictureModel.create({ title, img });
    }
  }
};

module.exports = resolvers;
