import { Schema, model } from 'mongoose';

const SentSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    message: {
      type: String,
      required: true,
    },
    criteria: {
      type: String,
      required: true,
    },
    platforms: {
      type: String,
      required: true,
    },
    studentsQuantity: {
      type: String,
      required: true,
    },
    responsibleQuantity: {
      type: String,
      required: true,
    },
    to: {
      type: Array,
      required: true,
    },
    hasErrors: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default model('sents', SentSchema);
