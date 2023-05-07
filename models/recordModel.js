const mongoose = require("mongoose");

// User schema
const recordSchema = new mongoose.Schema({
  kpiData: {
    type: String,
    required: [true, "A KPI must have a descriptive info"],
  },

  percentage: {
    type: Number,
    required: [true, "A KPI must have a percentage value"],
  },

  addedDate: Date,

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "A KPI must belong to a company"],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A KPI must belong to a user"],
  },
});

// // Mongoose Middleware to hash the password
// companySchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
// });

// Create model to get a interface to work with above schema
const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
