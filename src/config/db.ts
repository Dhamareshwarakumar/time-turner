import mongoose from 'mongoose';

const connectDB = () => {
    if (process.env.NODE_ENV !== 'development') {
        mongoose.set('autoIndex', false);
        mongoose.set('autoCreate', false);
    }
    // TODO: Handle creating Indexes & Collections during deployment

    mongoose
        .connect(process.env.MONGO_URI as string)
        .then((instance) => console.info(`Connected to MongoDB: host(${instance.connection.host})`))
        .catch((err) => console.error('MongoDB Connection Error: ', err));

    // TODO: Handle Mongoose Events
};

export default connectDB;
