import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },

}, { timestamps: true })

export default mongoose.model('Income', IncomeSchema)