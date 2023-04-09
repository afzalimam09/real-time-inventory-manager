import express from "express";
import inventoryRoute from "./inventory/inventoryRoute.js";
const router = express.Router();

router.use("/inventory", inventoryRoute);
export default router;
