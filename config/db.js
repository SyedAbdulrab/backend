const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  const connectWithRetry = async () => {
    try {
      await mongoose.connect("mongodb+srv://syed_abdulrab:syedabdulrab@cluster0.nt7qb.mongodb.net/mms?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Other options...
      });
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    }
  };

  // Start the initial connection attempt
  await connectWithRetry();
};

module.exports = connectToMongoDB;
