import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connection from "./src/DB/connection.js";
import * as allRoutes from "./src/app.controller.js";
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

connection();

app.use("/auth", allRoutes.authRouter);
app.use("/user", allRoutes.userRouter);
app.use("/message", allRoutes.messageRouter);
app.use("/uploads", express.static("./uploads"));

app.use("*", (req, res) => {
  res.send("In-valid Routing Plz check url or method");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
