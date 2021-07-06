import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
const saltRound = 8;

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 40,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // schematypes in mongoose documentation
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      match:
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.pre('save', async function(next) {   // No arrow function
  const user = this;
  if(user.isModified('password')) user['password'] = await bcrypt.hash(user['password'], saltRound);
  next();
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, 'JWT_SECRET_KEY', { expiresIn: '30d' });
  user['tokens'] = user['tokens'].concat({ token });
  await user.save();
  return token;
}

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject['password'];
  delete userObject['tokens'];
  delete userObject['avatar'];
  delete userObject['superAdmin'];
  delete userObject['superAdminExpiry'];

  return userObject;
}