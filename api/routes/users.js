import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import jwt from "jsonwebtoken";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//     res.send("Hello, you are logged in!")
// })

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello, you are logged in and you can delete your account")
// })

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in as Admin and you can delete all accounts!")
// })

//CREATE
router.post("/", createUser)
//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id", verifyUser, deleteUser)
//GET
router.get("/:id", verifyUser, getUser)
//GET ALL
router.get("/", verifyAdmin, getUsers)

export default router;