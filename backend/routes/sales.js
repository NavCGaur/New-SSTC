import express from "express";
import { getSales, getPaidServiceCounts } from "../controllers/sales.js";

const router = express.Router();

router.get("/sales", getSales);
router.get("/sales/paidservice",getPaidServiceCounts)


export default router;