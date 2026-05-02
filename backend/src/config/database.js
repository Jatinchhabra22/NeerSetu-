const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/neersetu';
    const conn = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Continuing without MongoDB...');
    // Don't exit process, just log error
  }
};

module.exports = connectDB;
