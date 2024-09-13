import express from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import isAllow from "../../middlewares/isAllow.js";
import { editUser, getAllUsers, getUser, removeUser } from "../controller/userMange.controller.js";


const userMangeRoute = express.Router();
userMangeRoute.use(verifyToken);

userMangeRoute.get("/users", isAllow("admin"), getAllUsers);
userMangeRoute.get("/users/:id", isAllow("admin"), getUser);
userMangeRoute.put("/users/:id", isAllow("admin"), editUser);
userMangeRoute.delete("/users/:id", isAllow("admin"), removeUser);

export default userMangeRoute;