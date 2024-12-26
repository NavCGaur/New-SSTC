import express from "express";
import { getSales, getPaidServiceCounts } from "../controllers/sales.js";

const router = express.Router();

router.get("/", getSales);
router.get("/paidservice",getPaidServiceCounts)


export default router;