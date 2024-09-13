export default function isAllow(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.userInfo.role)) {
            next();
        } else {
            res.status(401).send({ message: "You Are Not Allowed" })
        }
    }
}