const { Model: Tag } = require('../../models/tag');

const tagResolvers = {
  Query: {
    getTags: async (_, { query = {} }) => Tag.find(query)
  },
  Mutation: {
    editTag: async (_, { input: { name, hidden } }) => {
      await Tag.findOneAndUpdate({ name }, { hidden });
      return Tag.findOne({ name });
    },
    createTag: async (_, { input }) => Tag.findOneOrCreate(input)
  }
};

module.exports = tagResolvers;
