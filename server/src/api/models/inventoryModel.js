import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Creating cab schema
const inventorySchema = new Schema(
    {
        title: {
            type: String,
            unique: [true, "Title should be unique!"],
            required: [true, "Name is required!"],
        },
        description: {
            type: String,
            required: [true, "Description is required!"],
        },
        price: {
            type: Number,
            required: [true, "Price is required!"],
        },
        manufacturer: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_960_720.png",
        },
        status: {
            type: String,
            enum: ["in_stock", "out_of_stock", "back_order"],
            default: "in_stock",
        },
    },
    { timestamps: true }
);

// Creating model from schema
export default db.model("Inventory", inventorySchema);
