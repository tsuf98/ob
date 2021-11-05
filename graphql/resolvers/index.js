const tagResolvers = require('./tag');

const resolvers = {
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
    ...tagResolvers.Mutation
  }
};

module.exports = resolvers;
