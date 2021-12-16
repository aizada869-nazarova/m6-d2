import express from "express"
import pool from "../../utils/db/connect.js";

// { "product_name": {{$randomProductName}},
//         "description":{{$randomProductAdjective}},
//         "brand": {{$randomCompanyName}}, 	  
//         "image_url":{{$randomImageUrl}}, 
//         "price": {{$randomPrice}}, 
//         "category": {{$randomProductMaterial}} }
const productRouter = express.Router();
productRouter.post("/", async (req, res, next) => {
  try {
   const createProduct = await pool.query(
      "INSERT INTO product (product_name, description, brand, image_url, price, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
     Object.values(req.body)
      
    );
    res.status(201).send(createProduct.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
   const getProduct = await pool.query(
      'SELECT * FROM product');
    res.status(201).send(getProduct.rows);
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const getSingleProduct = await pool.query(
      "SELECT * FROM product WHERE product_id=$1",
      [req.params.id]
    );
    const getReviews = await pool.query(
      "SELECT * FROM review WHERE product_id=$1",
      [req.params.id]
    );
    const product = getSingleProduct.rows[0];
    if (product) {
      res.status(201).send({ ...product, reviews: getReviews.rows });
    } else {
      res.status(404).send({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM product WHERE product_id=$1", [
      req.params.id,
    ]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const valuesInTheBody = Object.values(req.body);
    const numberOfValues = valuesInTheBody.length;
    const updateStatement = Object.entries(req.body)
      .map(([key, value], i) => `${key}=$${i + 1}`)
      .join(",");
    const query = `UPDATE product SET ${updateStatement} WHERE product_id=$${
      numberOfValues + 1
    } RETURNING *;`;
    const updateResult = await pool.query(query, [
      ...valuesInTheBody,
      req.params.id,
    ]);
    res.status(201).send(updateResult.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// reviews
productRouter.post("/:id/review", async (req, res, next) => {
  try {
    const reviewCreateResponse = await pool.query(
      "INSERT INTO review(comment,rate,product_id) VALUES($1,$2,$3) RETURNING *",
      [...Object.values(req.body), req.params.id]
    );
    res.status(201).send(reviewCreateResponse.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.delete("/:id/review/:reviewId", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM review WHERE review_id=$1", [
      req.params.reviewId,
    ]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default productRouter