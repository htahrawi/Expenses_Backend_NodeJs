import mongoose from "mongoose";

const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
