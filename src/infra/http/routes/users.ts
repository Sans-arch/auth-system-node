import express from "express";
import { createUser, getUser } from "../controllers/users.controller";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);

export default router;
