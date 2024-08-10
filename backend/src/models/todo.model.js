import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String },
  subject: { type: String },
  snippet: { type: String }, // instead of body using snippet
  task: { type: String }, // This field stores the extracted task
  approved: { type: Boolean, default: false },
  emailId: { type: String, required: true}, // Store email ID to prevent duplicates
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
