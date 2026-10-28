const express = require("express")
const router = express.Router()
const logger = (req, res, next) => {
    console.log(
        `Request with method: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}`
    );
    next();
};
// Home Route
router.use(logger);
router.get("/", (req, res) => {
    const token = req.header("token");

    if (!token) {
        res.setHeader("hi");

        return res.status(401).json({
            message: "Token is required"
        });
    }

    res.setHeader("token", token);

    res.status(200).json({
        message: "Welcome",
        token: token
    });
});

// Products Route
router.get("/products", (req, res) => {
    const pid = req.query.pid;
    const pname = req.query.pname;

    console.log("Data received");

    res.status(200).json({
        pid,
        pname
    });
});

router.get("/:val", (req, res) => {
    res.send(`Received: ${req.params.val}`);
});

module.exports = router;