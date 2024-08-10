import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  tokens: {
    access_token: String,
    refresh_token: String,
    scope: String,
    token_type: String,
    expiry_date: Number,
  },
  config: {
    emailsToScan:{type: Number, default: 1}
  },
  token: { type: String } // This is where you'll store the session token
});

const User = mongoose.model("User", userSchema);
export default User;
