import mongoose from "mongoose";

const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    category: {
      type: String,
      requires: [true, "cat is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
