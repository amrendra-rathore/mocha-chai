const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Connection to the Mongodb Memory Server

let mongo = null;

module.exports.connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

//Disconnecting the MongoDB Memory Server

module.exports.closeDatabase = async () => {
  if(mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
}