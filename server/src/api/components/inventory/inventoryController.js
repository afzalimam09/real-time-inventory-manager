import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import APIFeatures from "../../utils/apiFeatures.js";
import Inventory from "../../models/inventoryModel.js";
import {
    emitAddInventory,
    emitDeleteInventory,
    emitUpdateInventory,
} from "../../../socket/socket.js";

export const createInventory = catchAsync(async (req, res, next) => {
    const inventory = await Inventory.create(req.body);

    // Emit an "add_inventory" event with the new inventory item to all connected clients using the emitAddInventory function
    emitAddInventory(inventory);

    // Send response to the client
    res.status(201).json({
        status: "success",
        data: inventory,
    });
});

export const getOneInventory = catchAsync(async (req, res, next) => {
    const inventory = await Inventory.findById(req.params.id);

    // Return an error if doc is not found
    if (!inventory) {
        return next(new AppError("No inventory found for given id", 404));
    }

    // Send response
    res.status(200).json({
        status: "success",
        data: inventory,
    });
});

export const getAllInventory = catchAsync(async (req, res, next) => {
    // Execute the query
    const features = new APIFeatures(Inventory.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const inventory = await features.query;

    // Send Response
    res.status(200).json({
        status: "success",
        results: inventory.length,
        data: inventory,
    });
});

export const updateInventory = catchAsync(async (req, res, next) => {
    const inventory = await Inventory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    // Return an error if doc is not found
    if (!inventory) {
        return next(new AppError("No inventory found with given id", 404));
    }

    // Emit an "update_inventory" event with the updated inventory item to all connected clients using the emitUpdateInventory function
    emitUpdateInventory(inventory);

    // Send response
    res.status(200).json({
        status: "success",
        data: inventory,
    });
});

export const deleteInventory = catchAsync(async (req, res, next) => {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    // Return an error if doc is not found
    if (!inventory) {
        return next(new AppError("No inventory was found with given id", 404));
    }

    // Emit an "delete_inventory" event with the deleted inventory item to all connected clients using the emitDeleteInventory function
    emitDeleteInventory(inventory);

    // Send response
    res.status(204).json({
        status: "success",
        data: null,
    });
});
