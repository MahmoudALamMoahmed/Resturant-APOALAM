import express from "express";
import { cancelOrder, getAllOrders, getOrder, orderMeal, removeMeal, updateAddress, updateOrderStatus } from "../controller/order.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";
import isAllow from "../../middlewares/isAllow.js";

const orderRoute = express.Router();
orderRoute.use(verifyToken);

orderRoute.post("/order/:mealId", orderMeal);
orderRoute.put("/order/:orderId", updateAddress);
orderRoute.delete("/order/:orderId", cancelOrder);
orderRoute.delete("/order/meal/:orderId", removeMeal);
orderRoute.patch("/order/:orderId", isAllow("admin"), updateOrderStatus);
orderRoute.get("/order", getAllOrders);
orderRoute.get("/order/:orderId", getOrder);


export default orderRoute;