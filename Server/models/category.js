const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //trim = any space in the beginning or end there will be trimmed out
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
