import { Schema, model } from 'mongoose';

const CreditSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      primaryKey: true,
    },
    email: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('credits', CreditSchema);
