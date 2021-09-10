const requireAll = require('require-all');
const path = require('path');

class ModelInitiator {
  initModels() {
    const data = requireAll(path.join(__dirname, './initial-data'));
    const models = requireAll(path.join(__dirname, '../../models'));

    for (const modelName in models) {
      const initialData = data[modelName];
      const { Model } = models[modelName];

      if (!initialData || !Model) {
        continue;
      }

      Model.findOne({}, async (err, docs) => {
        if (!docs) {
          console.log(`initiating ${modelName} data`);
          await Model.insertMany(initialData);
        }
        console.log(`${modelName}s are initiated`);
      });
    }
  }
}

module.exports = new ModelInitiator();
