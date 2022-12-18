/* eslint-disable no-undef */
import mongoose from 'mongoose';

const connectAtlas = async (url = process.env.NEXT_PUBLIC_DB_ATLAS) => {
  mongoose.set('debug', true);
  try {
    mongoose.connect(url);
    const connection = mongoose.connection;
    return connection.on('connected', () => {
      return mongoose;
    });
  } catch (error) {
    console.log(`ERROR ${error} connect ${process.env.NEXT_PUBLIC_DB_ATLAS} `);
    return { error, message: error.message };
  }
};

const connectMongoose = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await connectAtlas();
    } else if (process.env.NODE_ENV === 'production') {
      return await connectAtlas();
    }
  } catch (error) {
    throw Error(error);
  }
};
export default connectMongoose;
