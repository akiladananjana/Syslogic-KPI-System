const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },

  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },

  email: {
    type: String,
    required: [true, "A user must have a email address"],
    unique: true,
    lowercase: true, // transfer email to lowercase
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  photo: String,

  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "Password must have more than 8 characters"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "A user must provide the password again"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: "Passwords are not same",
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
  },
  passwordLastChanged: Date,
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
});

// Mongoose Middleware to hash the password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Create model to get a interface to work with above schema
const User = mongoose.model("User", userSchema);

module.exports = User;
