const mongoose = require("mongoose");

// User schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A company must have a name"],
  },

  description: {
    type: String,
    required: [true, "A company must have a description"],
  },

  startDate: Date,
  endDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A KPI records for Company must belong to a user"],
  },
});

// // Mongoose Middleware to hash the password
// companySchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
// });

// Create model to get a interface to work with above schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
