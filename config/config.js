const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    //mongodb+srv://ashish130392_db_user:JMBgXmnfQfzFl1Bs@mhcluster.5uhwklw.mongodb.net/

    await mongoose.connect('mongodb://ashish130392_db_user:6K75gnxK2gcvZyNO@ac-n8swk9s-shard-00-00.qbogacx.mongodb.net:27017,ac-n8swk9s-shard-00-01.qbogacx.mongodb.net:27017,ac-n8swk9s-shard-00-02.qbogacx.mongodb.net:27017/?ssl=true&replicaSet=atlas-145byl-shard-0&authSource=admin&appName=MyClusterDB1');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
