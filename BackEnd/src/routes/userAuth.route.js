import express from "express";
import { getMyProfile, signIn, signUp, verifyEmail } from "../controller/userAuth.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";

const userAuthRoute = express.Router();

userAuthRoute.post("/auth/register", signUp);
userAuthRoute.get("/verifyEmail/:email", verifyEmail);
userAuthRoute.post("/auth/login", signIn);
userAuthRoute.get("/auth/me", verifyToken, getMyProfile);


export default userAuthRoute;