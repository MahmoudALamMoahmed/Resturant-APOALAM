import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    mealItems: [{
        mealId: {
            type: Schema.Types.ObjectId,
            ref: "Meal"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["pending", "in preparation", "delivered"],
        default: "pending"
    },
    // New: Shipping details
    shippingDetails: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        comment: String,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
}, { versionKey: false, timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;