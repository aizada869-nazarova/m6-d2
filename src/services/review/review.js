import { Router } from "express";
import pool from "../../utils/db/connect.js"

import express from "express"
// import pool from "../../utils/db/connect.js";


const reviewRouter = express.Router();
reviewRouter.post("/", async (req, res, next) => {
  try {
    const { product_name, description, brand, image_url, price, category } = req.body;
    // const result = await pool.query(
    //   "INSERT INTO product (product_name, description, brand, image_url, price, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    //   [product_name, description, brand, image_url, price, category]
    // );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewRouter