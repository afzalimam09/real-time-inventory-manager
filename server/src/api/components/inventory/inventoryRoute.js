import { Router } from "express";
import {
    createInventory,
    deleteInventory,
    getAllInventory,
    getOneInventory,
    updateInventory,
} from "./inventoryController.js";

const router = Router();

router.route("/").get(getAllInventory).post(createInventory);

router
    .route("/:id")
    .get(getOneInventory)
    .put(updateInventory)
    .delete(deleteInventory);

export default router;
