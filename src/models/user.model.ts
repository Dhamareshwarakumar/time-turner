import crypto from 'crypto';
import mongoose, { Model, Schema, MongooseError } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    salt?: string;
}

interface IUserMethods {
    hashPassword(plainPassword: string): string;
    authenticate(plainPassword: string): boolean;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
    findUserByEmail(email: string): Promise<IUser & IUserMethods>;
    addUser(data: IUser): Promise<IUser & IUserMethods>;
    updateUser(identifier: any, data: IUser): Promise<IUser & IUserMethods>;
}

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [255, 'Name cannot be more than 255 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [7, 'Email must be at least 7 characters long'],
            maxlength: [255, 'Email cannot be more than 255 characters'],
            index: 1,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        salt: {
            type: String,
            required: true,
            default: () => uuidv4(),
        },
    },
    {
        timestamps: true,
    },
);

// Middlewares
userSchema.pre('save', function (next) {
    this.password = this.hashPassword(this.password);
    next();
});

// Instance Methods  (DO NOT USE ARROW FUNCTIONS TO CREATE MONGOOSE METHODS)
userSchema.methods.hashPassword = function (plainPassword: string): string {
    if (!plainPassword) return '';
    try {
        return crypto
            .createHmac('sha256', this.salt as string)
            .update(plainPassword)
            .digest('hex');
    } catch (err) {
        throw new MongooseError(`[UserModel][hashPassword]: ${err}`);
    }
};

userSchema.methods.authenticate = function (plainPassword: string): boolean {
    const hashedPassword = this.hashPassword(plainPassword);
    if (hashedPassword) return crypto.timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(this.password));
    return false;
};

// Static Methods
userSchema.statics.findUserByEmail = async function (email: string): Promise<(IUser & IUserMethods) | null> {
    return await this.findOne({ email }).exec();
};

userSchema.statics.addUser = async function (data): Promise<(IUser & IUserMethods) | null> {
    return await this.create(data);
};

userSchema.statics.updateUser = async function (identifier, data: IUser): Promise<(IUser & IUserMethods) | null> {
    return await this.findOneAndUpdate(identifier, data).exec();
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
