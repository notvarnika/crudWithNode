const exp = require("express");
const multer = require("multer");
const app= exp();
//multer formik cors  => middleware
//special method in node js in which we have minimum 3 parameters(can be 4)
// request, response , next (next middleware), error response, next (error handler),
//
//helmet security for header attacks (sss attacks(header based))

const output = multer()
app.use(exp.urlencoded({extended:true}))
app.use(exp.json());
app.use(output.none());

app.get("/",(req, res)=>{
    res.send("welcome to express js");
})

app.get("/products", (req,res)=>{
    const pid = req.body.pid;
    const pname = req.body.pname;
    res.status(200).json({
        pid,pname
    })
    console.log("data inserted");
})

app.post("/products",output.none(), (req,res, next)=>{
    const pid = req.body.pid;
    const pname = req.body.pname;
    res.status(200).json({
        pid,pname
    })
    console.log("data inserted");
})

// //products

// app.get("/product/:id",(req, res)=>{
//     const pid = req.params.id;
//     res.send("product id:"+pid);
// })



// app.post("/",(req, res)=>{
//     res.send("welcome to express js");
// })
// app.put("/",(req, res)=>{
//     res.send("welcome to express js");
// })
// app.delete("/",(req, res)=>{
//     res.send("welcome to express js");
// })

app.listen(3000,(error)=>{
    if(error){
        console.log(error.message)
        console.log("Hi")
    }
console.log("Running server on: http://127.0.0.1:3000")
        console.log("Hi")

})