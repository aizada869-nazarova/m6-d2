import express from "express";
import cors from "cors"
import { testDbConnection } from "./utils/db/connect.js";
import productRouter from "./services/product/product.js";
import reviewRouter from "./services/review/review.js";

const server = express()

server.use(express.json());
server.use(cors());

server.use('/product', productRouter)
server.use('/review', reviewRouter)

server.listen(process.env.PORT || 3001, () => {
    console.log("✅ Server is running");
   testDbConnection()
  });