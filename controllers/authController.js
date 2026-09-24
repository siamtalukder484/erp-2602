

let registrationController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Picture is required" });
    }

    const imageUrl = req.file.path;
    console.log("Image URL:", imageUrl);

    res.status(201).json({
        message: "Registration route",
        imageUrl
    });
}
let loginController = async (req, res) => {
    res.send("login route")
}

module.exports = {
    registrationController,
    loginController
}