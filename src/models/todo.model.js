import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  message_id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
