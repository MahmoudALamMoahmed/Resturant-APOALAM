import express from "express";
import dbConnection from "./DB/config.js";
import userAuthRoute from "./src/routes/userAuth.route.js";
import userMangeRoute from "./src/routes/userMange.route.js";
import orderRoute from "./src/routes/order.route.js";
import cors from "cors";
import cartRoute from "./src/routes/cart.route.js";

const app = express()

app.use(express.json());
app.use(cors());
dbConnection;

app.use(userAuthRoute);
app.use(userMangeRoute)
app.use(orderRoute);
app.use(cartRoute);


app.listen(3000, () => {
    console.log("App is running")
})