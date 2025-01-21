import mongoose from "mongoose";

const connection = async () => {
  return await mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("DB connection established");
    })
    .catch(() => {
      console.log("Error connecting to DB");
    });
};

export default connection;
