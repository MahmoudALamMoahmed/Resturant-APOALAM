import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided." });
    }

    jwt.verify(token, 'fady', function (err, decoded) {
        if (err) return res.status(403).json({ message: "Invalid or expired token." });
        req.userInfo = decoded;
        next();
    });
}

export default verifyToken;
