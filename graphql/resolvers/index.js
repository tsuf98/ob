const { GraphQLUpload } = require('graphql-upload');
const tagResolvers = require('./tag');
const pictureResolvers = require('./picture');

// const { PictureModel } = require('../../models/picture');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // aboutUs: async (root, { lang }) => {
    //   console.log(lang);
    //   return AboutUs.findOne({ language: lang });
    // },
    // tiles: () => find(Tile),
    ...tagResolvers.Query,
    ...pictureResolvers.Query
  },
  Mutation: {
    // aboutUs: (root, { input }) => {
    //   console.log(input);
    //   return create(AboutUs, input);
    // },
    // tiles: (root, { input }) => create(Tile, input),
    ...tagResolvers.Mutation,
    ...pictureResolvers.Mutation
  }
};

module.exports = resolvers;
