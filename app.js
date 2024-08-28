const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/usersRoutes");
const productRouter = require("./routes/productsRoutes");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const dotenv= require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");


app.use("/",indexRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);

app.listen(3000);
