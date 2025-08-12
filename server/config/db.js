import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rental_app';
    if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
      console.warn('MONGO_URI/MONGODB_URI not set. Falling back to mongodb://127.0.0.1:27017/rental_app');
    }
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo connection error: ${error.message}`);
    console.error('Ensure MongoDB is running and MONGO_URI or MONGODB_URI is set in .env');
    process.exit(1);
  }
};

export default connectDB;
