import orderModel from "../../DB/models/order.model.js";
import userModel from "../../DB/models/user.model.js"


const getAllUsers = async (req, res) => {
    const allUsers = await userModel.find();

    if (allUsers) {
        res.status(200).json({ message: "Users Found", allUsers });
    } else {
        res.status(404).json({ message: "There Is No User" });
    }
}

const getUser = async (req, res) => {
    const User = await userModel.findById(req.params.id);
    if (User) {
        res.status(200).json({ message: "User Found", User });
    } else {
        res.status(404).json({ message: "There Is No User" });
    }
}

const editUser = async (req, res) => {
    const User = await userModel.findById(req.params.id);
    if (User) {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: "User Updated", updatedUser });
    } else {
        res.status(404).json({ message: "There Is No User" });
    }
}

const removeUser = async (req, res) => {
    const User = await userModel.findById(req.params.id);
    if (User) {
        const deleteddUser = await userModel.findByIdAndDelete(req.params.id);
        await orderModel.deleteMany({ userId: req.params.id });
        res.status(200).json({ message: "User Deleted", deleteddUser });
    } else {
        res.status(404).json({ message: "There Is No User" });
    }
}


export {
    getAllUsers,
    getUser,
    editUser,
    removeUser
}