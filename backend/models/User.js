const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true,   // Ensure email is unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  // You can add more fields like profile picture, bio, etc.
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
  // Check if the password is being modified
  if (!this.isModified('password')) return next();

  // Salt and hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Continue to save the user
});

// Method to compare entered password with the hashed password in the DB
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model to be used in other parts of the app
module.exports = mongoose.model('User', UserSchema);
