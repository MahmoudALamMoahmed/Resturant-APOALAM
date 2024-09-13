import userModel from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import sendVerfication from "../../utilities/sendEmail.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    const findUser = await userModel.findOne({ email: req.body.email });

    if (findUser) return res.status(409).json({ message: "you already have an account" });

    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const newUser = await userModel.insertMany(req.body);
    sendVerfication(req.body.email);
    return res.status(201).json({ message: "signedUp!", user: newUser });
}


const verifyEmail = async (req, res) => {
    const findUser = await userModel.findOneAndUpdate({ email: req.params.email }, { isEmailVerfied: true }, { new: true });
    if (findUser) {
        res.status(200).json({ message: "Your Email Is Verified!", user: findUser })
    } else {
        res.status(404).json({ message: `No Email Found` });
    }
}

const signIn = async (req, res) => {
    const isUser = await userModel.findOne({ email: req.body.email });
    if (isUser) {
        if (bcrypt.compareSync(req.body.password, isUser.password)) {
            const token = jwt.sign({ id: isUser.id, role: isUser.role }, "fady", { expiresIn: "24h" });
            res.json({ message: `Welcome ${isUser.userName}`, token })
        } else {
            res.status(401).json({ message: `Please Check Your Password` })
        }
    } else {
        res.status(401).json({ message: `Please Check Your Email` });
    }
}

const getMyProfile = async (req, res) => {
    const findUser = await userModel.findById(req.userInfo.id);
    res.status(200).json(findUser);
}


export {
    signUp,
    verifyEmail,
    signIn,
    getMyProfile
}