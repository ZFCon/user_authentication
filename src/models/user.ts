import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  setPassword(password: string): Promise<void>;
  checkPassword(password: string): Promise<Boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (document: Document, record: Record<string, unknown>) => {
        delete record.password;
        return record;
      },
    },
    toObject: {
      virtuals: true,
    },
  },
);

UserSchema.methods.setPassword = async function (password: string) {
  this.password = await bcrypt.hash(password, 10);
  this.save();
};

UserSchema.methods.checkPassword = async function (password: string): Promise<Boolean> {
  return bcrypt.compare(password, this.password);
};


export const User = model<IUser>('User', UserSchema);
