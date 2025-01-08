import { Document, Model, model, Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
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

export const User = model<IUser>('User', UserSchema);
