import express from "express";
import { login } from "../controller/auth/login";
import { register } from "../controller/auth/register";
import { logout } from "../controller/auth/logout";
import { requireSignin } from "../middlewares/middleware";
import { currentUser } from "../controller/auth/user";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/current-user", requireSignin, currentUser);

module.exports = router;
