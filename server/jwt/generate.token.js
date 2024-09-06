import jwt from "jsonwebtoken"

const GenerateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'3d'
    })
    res.cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnlly: true,
        sameSite: "strict",
        secure:process.env.ENV !== "development"
    });
}

export default GenerateToken