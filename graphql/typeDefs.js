const { gql } = require('apollo-server-express');
const typeDefs = gql`
  scalar Upload
  enum LANG {
    Hebrew
    English
  }

  # enum TILE_SIZE {
  #     "10x10"
  #     "15x15"
  #     "20x20"
  #     "60x60"
  # }

  type Picture {
    _id: ID
    title: String!
    img: Upload
    tags: [Tag]
    description: String
    connectedTiles: [Tile]
  }

  input PictureInput {
    _id: ID
    title: String!
    img: Upload!
    tags: [TagInput]
    description: String
    connectedTiles: [TileInput]
  }

  type AboutUs {
    _id: ID
    language: LANG!
    content: String
    location: String
    connectedImages: [Picture]
  }

  input AboutUsInput {
    language: LANG
    content: String
    location: String
    connectedImages: [PictureInput]
  }

  type Tag {
    _id: ID
    name: String!
    hidden: Boolean
  }

  input TagInput {
    _id: ID
    name: String
    hidden: Boolean
  }

  type Tile {
    _id: ID
    title: String!
    connectedImages: [Picture]
    tags: [Tag]
    description: String
    size: String
  }

  input TileInput {
    _id: ID
    title: String
    connectedImages: [PictureInput]
    tags: [TagInput]
    description: String
    size: String
  }

  type Query {
    # aboutUs(lang: String): AboutUs
    getTags(query: TagInput): [Tag]
    getTiles(query: TileInput): [Tile]
  }

  type Mutation {
    # aboutUs(input: AboutUsInput): AboutUs
    createTag(input: TagInput): Tag
    editTag(input: TagInput): Tag
    createTile(input: TagInput): Tile
    editTile(input: TagInput): Tile
    createPicture(pictureInput: PictureInput): Picture
  }
`;

module.exports = typeDefs;
