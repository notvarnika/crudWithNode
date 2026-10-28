const exp = require("express");
const app = exp();
const checkUser = (req, res, next) => {
    console.log("Checking User");
    next();
};
app.use(checkUser)
app.get('/profile', checkUser, (req, res) => {
    res.send("Profile Page");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})














// const auth = (req, res, next) => {
//     const token = req.query.token;

//     if (token === "123") {
//         next(); // allow access
//     } else {
//         res.status(401).send("Unauthorized");
//     }
// };
// app.get("/dashboard", auth, (req, res) => {
//     res.send("Welcome to Dashboard");
// });
