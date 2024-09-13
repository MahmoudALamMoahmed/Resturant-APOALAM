import express from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import { addToCart, checkOut, clearCart, getCart, removeFromCart } from "../controller/cart.controller.js";

const cartRoute = express.Router();
cartRoute.use(verifyToken);

cartRoute.get("/cart", getCart);
cartRoute.post("/cart/:id", addToCart);
cartRoute.delete("/cart/:id", removeFromCart);
cartRoute.delete("/cart", clearCart);
cartRoute.post("/cart", checkOut);


export default cartRoute;