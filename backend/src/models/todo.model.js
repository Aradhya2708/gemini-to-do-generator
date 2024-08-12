import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String },
  subject: { type: String },
  snippet: { type: String }, 
  task: { type: String }, 
  approved: { type: Boolean, default: false },
  emailId: { type: String, required: true}, 
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
