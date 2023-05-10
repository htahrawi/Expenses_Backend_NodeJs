import mongoose from "mongoose";
import transaction from "../models/expense";
import income from "../models/income";

const collectionNames = [transaction, income];

export const deleteOldData = async () => {
    const numMonths = 1;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - numMonths);

    for (const collectionName of collectionNames) {
        const Model = mongoose.model(collectionName);
        await Model.deleteMany({ created_at: { $lt: cutoffDate } });
    }
};