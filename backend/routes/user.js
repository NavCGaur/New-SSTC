import express from "express";
import { getUser, getUserById, postUser, deleteUserById, editUserById } from "../controllers/user.js";

const router = express.Router();


router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/",postUser);
router.put("/:id", editUserById);
router.delete("/:id",deleteUserById);

export default router;