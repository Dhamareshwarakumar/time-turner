import mongoose, { MongooseError } from 'mongoose';
import logger from '../utils/logger';
import * as constants from '../utils/constants';

const connectDB = () => {
    if (!process.env.MONGO_URI) {
        throw new MongooseError('Please define a MongoDB connection string');
    }

    if (process.env.NODE_ENV !== constants.NODE_ENV_DEV) {
        mongoose.set('autoIndex', false);
        mongoose.set('autoCreate', false);
    }
    // TODO: Handle creating Indexes & Collections during deployment

    mongoose
        .connect(process.env.MONGO_URI as string)
        .then((instance) => logger.info(`Connected to MongoDB. host(${instance.connection.host})`))
        .catch((err) => logger.error(`MongoDB Connection Error: ${err}'`));

    // TODO: Handle Mongoose Events
};

export default connectDB;
