import express from "express";
import { createUser, getUser, updateUser } from "../controllers/users.controller";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);

export default router;
