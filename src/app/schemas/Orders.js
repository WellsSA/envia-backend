import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('orders', OrderSchema);
