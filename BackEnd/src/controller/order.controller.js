import orderModel from "../../DB/models/order.model.js";
import userModel from "../../DB/models/user.model.js";



const orderMeal = async (req, res) => {
    const userId = req.userInfo.id;
    const { mealId } = req.params;
    const { quantity = 1 } = req.body;

    // // Check if there is an existing order for the user and that order is pending
    const userOrders = await orderModel.findOne({
        userId, status: "pending"
    });

    if (userOrders) {
        const mealIndex = userOrders.mealItems.findIndex(item => item.mealId == mealId);
        if (mealIndex !== -1) {
            userOrders.mealItems[mealIndex].quantity += quantity;
        } else {
            userOrders.mealItems.push({ mealId, quantity })
        }
        await userOrders.save();
        return res.status(200).json({ message: "Order updated successfully", order: userOrders });
    }
    else {
        // Create a new order
        const newOrder = new orderModel({
            userId,
            mealItems: [{ mealId, quantity }],
            shippingDetails: {
                address: req.body.address,
                city: req.body.city,
                postalCode: req.body.postalCode,
                comment: req.body.comment,
            },
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });
        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    }
};

const updateAddress = async (req, res) => {
    let order = await orderModel.findOneAndUpdate({
        _id: req.params.orderId, userId: req.userInfo.id, status: "pending"
    }, { shippingDetails: req.body }, { new: true });
    if (order) {
        res.status(200).json({ messgae: "Order Address Updated", order });
    } else {
        res.status(409).json({ messgae: "This Action Can Not Be Complete" });
    }
}



const cancelOrder = async (req, res) => {
    let order = await orderModel.findOneAndDelete({
        _id: req.params.orderId, userId: req.userInfo.id, status: "pending"
    });
    if (order) {
        res.status(200).json({ messgae: "Order Canceled", order });
    } else {
        res.status(409).json({ messgae: "This Action Can Not Be Complete" });
    }
}

const removeMeal = async (req, res) => {
    let order = await orderModel.findOne({ userId: req.userInfo.id, status: "pending" })
    if (order) {
        order.mealItems = order.mealItems.filter((meal) => meal.mealId != req.params.mealId);
        await order.save();
        res.status(200).json({ messgae: "Meal Removed", order });

        // remove the whole order if it is last meal in the order
        if (order.mealItems.length == 0) {
            await orderModel.findByIdAndDelete(req.params.orderId);
        }
    } else {
        res.status(409).json({ messgae: "This Action Can Not Be Complete", order });
    }
}

const updateOrderStatus = async (req, res) => {
    const userId = req.body.userId;
    const newOrderStatus = req.body.status;
    let order = await orderModel.findOneAndUpdate({ _id: req.params.orderId, userId }, { status: newOrderStatus }, { new: true });

    if (order) {
        res.status(200).json({ message: "order Status Updated", order });
    }
    else {
        res.status(409).json({ message: "This Action Can Not Be Complete" });
    }
}


const getAllOrders = async (req, res) => {
    if (req.userInfo.role == "admin") {
        // if is an admin it will return all users orders
        const allOrders = await orderModel.find();
        if (allOrders && allOrders.length > 0) {
            res.status(200).json({ message: "all users Orders fetched", allOrders });
        }
        else {
            res.status(404).json({ message: "there are no orders yet!" })
        }
    }
    else if (req.userInfo.role == "user") {
        // if is a user it will return all its own orders
        const allOrders = await orderModel.find({ userId: req.userInfo.id });
        if (allOrders && allOrders.length > 0) {
            res.status(200).json({ message: "all Orders fetched", allOrders });
        }
        else {
            res.status(404).json({ message: "there are no orders yet!" })
        }
    }
}

const getOrder = async (req, res) => {
    if (req.userInfo.role == "admin") {
        // if is an admin it will return all users orders
        const order = await orderModel.findById(req.params.orderId);
        if (order && order.length > 0) {
            res.status(200).json({ message: "all users Orders fetched", order });
        }
        else {
            res.status(404).json({ message: "there are no order yet!" })
        }
    }
    else if (req.userInfo.role == "user") {
        // if is a user it will return all its own orders
        const order = await orderModel.find({ _id: req.params.orderId, userId: req.userInfo.id });
        if (order && order.length > 0) {
            res.status(200).json({ message: "order fetched", order });
        }
        else {
            res.status(404).json({ message: "there are no order!" })
        }
    }
}

export {
    orderMeal,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
    removeMeal,
    getOrder,
    updateAddress
}
